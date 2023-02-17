-- AlterTable
ALTER TABLE "PasswordReset" ALTER COLUMN "validUntil" SET DEFAULT (timezone('utc'::text, now()) + '1 days'::interval);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false;
