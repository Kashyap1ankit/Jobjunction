"use server";

import prisma from "@/db";
import { CheckUser } from "./users/checkUser";
import webpush from "web-push";

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

export async function addNotificationSubscription(subscription: string) {
  try {
    const response = await CheckUser();

    if (response.status !== 200 || !response.userId)
      throw new Error(response.message);

    await prisma.notification.create({
      data: {
        userId: response.userId,
        subscription,
      },
    });

    return {
      status: 200,
      message: "Created subscription",
    };
  } catch (error) {
    return {
      status: 400,
      message: (error as Error).message,
    };
  }
}

export async function removeNotificationSubscription() {
  try {
    const response = await CheckUser();

    if (response.status !== 200 || !response.userId)
      throw new Error(response.message);

    const findPost = await prisma.notification.findFirst({
      where: {
        userId: response.userId,
      },
      select: {
        id: true,
      },
    });

    if (!findPost) throw new Error("No such Notification subscription");

    await prisma.notification.delete({
      where: {
        id: findPost?.id,
        userId: response.userId,
      },
    });

    return {
      status: 200,
      message: "Deleted subscription",
    };
  } catch (error) {
    return {
      status: 400,
      message: (error as Error).message,
    };
  }
}

export const getUserSubscription = async () => {
  const response = await CheckUser();

  if (response.status !== 200 || !response.userId)
    throw new Error(response.message);

  try {
    const res = await prisma.notification.findFirst({
      where: {
        userId: response.userId,
      },
    });
    return {
      status: 200,
      message: "Subscription Retrieved",
      data: res,
    };
  } catch (error) {
    return {
      status: 400,
      message: (error as Error).message,
      data: null,
    };
  }
};

export async function SendNotification(company_name: string) {
  try {
    const response = await CheckUser();

    if (response.status !== 200 || !response.userId)
      throw new Error(response.message);

    const sub = await prisma.notification.findFirst({
      where: {
        userId: response.userId,
      },
    });

    if (!sub) throw new Error("No subscription found");

    webpush.setVapidDetails(
      "mailto:example@yourdomain.org",
      vapidKeys.publicKey as string,
      vapidKeys.privateKey as string,
    );

    const allSubscribedUser = await prisma.notification.findMany({
      where: {
        userId: {
          not: response.userId,
        },
      },
    });

    if (allSubscribedUser.length < 0)
      throw new Error("No user to send notification");

    for (const user of allSubscribedUser) {
      await webpush.sendNotification(
        JSON.parse(user.subscription),
        JSON.stringify({
          message: "New Job Alert",
          body: `🔥Vacany at ${company_name}...Apply Fast`,
        }),
      );
    }

    return {
      status: 200,
      message: "Notification Sent",
    };
  } catch (error) {
    return {
      status: 400,
      message: (error as Error).message,
    };
  }
}
