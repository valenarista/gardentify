/*
  Warnings:

  - Made the column `quantity` on table `Harvest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Harvest" ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "quantity" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PasswordReset" ALTER COLUMN "validUntil" SET DEFAULT (timezone('utc'::text, now()) + '1 days'::interval);
