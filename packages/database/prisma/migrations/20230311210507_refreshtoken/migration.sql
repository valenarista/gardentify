-- AlterTable
ALTER TABLE "PasswordReset" ALTER COLUMN "validUntil" SET DEFAULT (timezone('utc'::text, now()) + '1 days'::interval);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "uuid" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "userUuid" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "RefreshToken_userUuid_idx" ON "RefreshToken"("userUuid");
