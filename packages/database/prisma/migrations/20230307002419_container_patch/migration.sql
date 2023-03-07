-- AlterEnum
ALTER TYPE "ContainerType" ADD VALUE 'Patch';

-- AlterTable
ALTER TABLE "PasswordReset" ALTER COLUMN "validUntil" SET DEFAULT (timezone('utc'::text, now()) + '1 days'::interval);
