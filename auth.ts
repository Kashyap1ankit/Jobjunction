import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db/index";
import { signinSchema } from "./schema/auth";

import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        const data = {
          username: credentials.username as string,
          password: credentials.password as string,
        };
        try {
          const { success } = signinSchema.safeParse(data);

          if (!success) throw new Error("Schema validation failed");

          const isUserExist = await prisma.user.findFirst({
            where: {
              username: data.username,
            },
          });

          if (!isUserExist) {
            throw new Error("User not found");
          }

          const checkPassword = await bcrypt.compare(
            data.password,
            isUserExist.password as string,
          );

          if (!checkPassword) {
            throw new Error("Password is wrong");
          }

          return {
            id: isUserExist?.id,
            username: isUserExist?.username,
            email: isUserExist.email,
            role: isUserExist.role,
            instagram: isUserExist.instagram_url,
            linkedin: isUserExist.linkedin_url,
            twitter: isUserExist.twitter_url,
            bio: isUserExist.bio,
            createdAt: isUserExist.createdAt,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    Google,
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const userDetials = await prisma.user.findFirst({
            where: {
              email: user.email as string,
            },
          });

          if (!userDetials) {
            let admin = false;
            if (user.email === "kashyap25ankit@gmail.com") admin = true;
            const createdUser = await prisma.user.create({
              data: {
                username: user.email as string,
                email: user.email as string,
                avatar: user.image,
                provider: account.provider,
                provider_id: account.providerAccountId,
                role: admin ? "ADMIN" : "USER",
              },
            });

            if (!createdUser) throw new Error("Error while saving the user");
            //pushing the db id here instead of custom google id
            user.id = createdUser.id as string;
            user.role = createdUser.role as string;
            user.instagram = createdUser.instagram_url as string;
            user.linkedin = createdUser.linkedin_url as string;
            user.twitter = createdUser.twitter_url as string;
            user.bio = createdUser.bio as string;
            user.createdAt = createdUser.createdAt;
            return true;
          }
          //pushing the db id here instead of custom google id
          user.id = userDetials.id as string;
          user.role = userDetials.role as string;
          user.instagram = userDetials.instagram_url as string;
          user.linkedin = userDetials.linkedin_url as string;
          user.twitter = userDetials.twitter_url as string;
          user.bio = userDetials.bio as string;
          user.createdAt = userDetials.createdAt;
          return true;
        } catch {
          return false;
        }
      }

      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username ?? user.email;
        token.role = user.role;
        token.instagram = user.instagram;
        token.linkedin = user.linkedin;
        token.twitter = user.twitter;
        token.bio = user.bio;
        token.createdAt = user.createdAt;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.username = token.username as string;
      session.user.role = token.role as string;
      session.user.instagram = token.instagram as string;
      session.user.linkedin = token.linkedin as string;
      session.user.twitter = token.twitter as string;
      session.user.bio = token.bio as string;
      session.user.createdAt = token.createdAt as Date;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },

  cookies: {
    sessionToken: {
      name: "session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      },
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3,
  },
});
