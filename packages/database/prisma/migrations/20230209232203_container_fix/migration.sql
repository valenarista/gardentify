/*
  Warnings:

  - You are about to drop the column `dirthDepth` on the `Container` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Container" DROP COLUMN "dirthDepth",
ADD COLUMN     "dirtDepth" DOUBLE PRECISION NOT NULL DEFAULT 0;
