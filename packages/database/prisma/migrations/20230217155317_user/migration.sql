/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `oauthId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_oauthId_key";

-- AlterTable
ALTER TABLE "PasswordReset" ALTER COLUMN "validUntil" SET DEFAULT (timezone('utc'::text, now()) + '1 days'::interval);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
DROP COLUMN "oauthId";
