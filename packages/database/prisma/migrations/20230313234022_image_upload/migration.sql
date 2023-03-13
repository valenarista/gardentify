-- AlterTable
ALTER TABLE "PasswordReset" ALTER COLUMN "validUntil" SET DEFAULT (timezone('utc'::text, now()) + '1 days'::interval);

-- CreateTable
CREATE TABLE "ImageUpload" (
    "uuid" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageUpload_pkey" PRIMARY KEY ("uuid")
);
