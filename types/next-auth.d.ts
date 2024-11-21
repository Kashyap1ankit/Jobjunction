import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    username: string;
    role: string;
    instagram: string | null;
    linkedin: string | null;
    twitter: string | null;
    bio: string | null;
    createdAt: Date;
  }
}
