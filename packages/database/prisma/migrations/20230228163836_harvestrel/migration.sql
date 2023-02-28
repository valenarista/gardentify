/*
  Warnings:

  - Added the required column `plantUuid` to the `Harvest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Harvest" ADD COLUMN     "plantUuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PasswordReset" ALTER COLUMN "validUntil" SET DEFAULT (timezone('utc'::text, now()) + '1 days'::interval);

-- CreateIndex
CREATE INDEX "Harvest_plantUuid_idx" ON "Harvest"("plantUuid");
