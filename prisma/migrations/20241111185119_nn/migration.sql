/*
  Warnings:

  - Made the column `salary_disclosed` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "salary_disclosed" SET NOT NULL;
