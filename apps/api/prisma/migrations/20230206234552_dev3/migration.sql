/*
  Warnings:

  - Added the required column `dirthDepth` to the `Container` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Container" ADD COLUMN     "dirthDepth" DOUBLE PRECISION NOT NULL;
