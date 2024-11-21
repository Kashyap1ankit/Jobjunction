/*
  Warnings:

  - Made the column `company_logo` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "company_logo" SET NOT NULL,
ALTER COLUMN "company_logo" SET DEFAULT '/Images/jj-logo.png';
