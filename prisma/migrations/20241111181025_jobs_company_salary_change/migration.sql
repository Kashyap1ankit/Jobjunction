/*
  Warnings:

  - You are about to drop the column `role_name` on the `Post` table. All the data in the column will be lost.
  - Added the required column `salary_disclosed` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "role_name",
ADD COLUMN     "company_logo" TEXT,
ADD COLUMN     "company_website" TEXT,
ADD COLUMN     "salary_disclosed" BOOLEAN NOT NULL,
ALTER COLUMN "salary_max" DROP NOT NULL,
ALTER COLUMN "salary_min" DROP NOT NULL;
