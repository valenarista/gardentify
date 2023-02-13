/*
  Warnings:

  - You are about to drop the column `plantedSeedsOn` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `seedsSproutedOn` on the `Plant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "plantedSeedsOn",
DROP COLUMN "seedsSproutedOn",
ADD COLUMN     "seedsPlantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "seedsSproutedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
