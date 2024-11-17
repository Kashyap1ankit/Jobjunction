"use server";

import { auth, signOut } from "@/auth";
import prisma from "@/db";

export async function CheckUser() {
  try {
    const session = await auth();

    if (!session?.user) throw new Error("Not Logged In");

    const isUser = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!isUser) {
      return signOut();
    }

    return {
      status: 200,
      message: "Logged In",
      userId: session.user.id,
    };
  } catch (error: any) {
    return {
      status: 404,
      message: error.message,
    };
  }
}

//Get User by id

export async function GetUserDetailById(userId: string) {
  try {
    const response = await CheckUser();

    if (response.status !== 200) throw new Error(response.message);

    const isUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        linkedin_url: true,
        instagram_url: true,
        twitter_url: true,
        bio: true,
        avatar: true,
        createdAt: true,
        role: true,
      },
    });

    if (!isUser) throw new Error("User Not exist in database");

    return {
      status: 200,
      message: "Logged In",
      data: isUser,
    };
  } catch (error: any) {
    return {
      status: 404,
      message: error.message,
      data: null,
    };
  }
}

//Get all user for admin

export async function GetAllUserAdmin(userId: string) {
  try {
    const response = await CheckUser();

    if (response.status !== 200) throw new Error(response.message);

    const isAdmin = await prisma.user.findFirst({
      where: {
        id: userId,
        role: "ADMIN",
      },
    });

    if (!isAdmin) throw new Error("You are not admin");

    const getAllUser = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        username: true,
        role: true,
        email: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    if (!getAllUser || getAllUser.length === 0)
      throw new Error("No user found");

    return {
      status: 200,
      message: "Users fetched",
      data: getAllUser,
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: [],
    };
  }
}
