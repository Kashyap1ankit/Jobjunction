"use server";

import prisma from "@/db";
import { signupSchema, SignupInputType } from "@/schema/auth";
import bcrypt from "bcryptjs";

export async function CreateUser(data: SignupInputType) {
  const saltRounds = 10;
  try {
    const { success } = signupSchema.safeParse(data);
    if (!success) throw new Error("Schema validation Error");
    const isUserExist = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: data.username,
          },
          {
            email: data.email,
          },
        ],
      },
    });

    if (isUserExist)
      throw new Error("User with this username / email already exist");

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        avatar: data.avatar,
        bio: data.bio,
        instagram_url: data.instagram_url,
        linkedin_url: data.linkedin_url,
        twitter_url: data.twitter_url,
        provider: "credentials",
      },

      select: {
        id: true,
        username: true,
        email: true,
        provider: true,
      },
    });

    if (!newUser) throw new Error("Error while saving the user in the databse");

    return {
      status: 200,
      message: "user doesn't exist in the database",
      newUser,
    };
  } catch (error: any) {
    return {
      status: 400,
      message: error.message,
    };
  }
}
