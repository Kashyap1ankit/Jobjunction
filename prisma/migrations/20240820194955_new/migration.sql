-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('google', 'credentials');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "password" TEXT,
    "avatar" TEXT,
    "email" TEXT NOT NULL,
    "instagram_url" TEXT,
    "linkedin_url" TEXT,
    "twitter_url" TEXT,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "provider" "Provider" NOT NULL DEFAULT 'google',
    "provider_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "apply_link" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "experience_level" TEXT NOT NULL,
    "job_type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "role_description" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "salary_max" INTEGER NOT NULL,
    "salary_min" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
