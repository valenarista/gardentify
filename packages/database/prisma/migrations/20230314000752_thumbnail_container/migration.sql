-- DropIndex
DROP INDEX "Container_userUuid_idx";

-- DropIndex
DROP INDEX "Harvest_plantUuid_idx";

-- DropIndex
DROP INDEX "HeightRegistration_plantUuid_idx";

-- DropIndex
DROP INDEX "Plant_containerUuid_idx";

-- DropIndex
DROP INDEX "RefreshToken_userUuid_idx";

-- AlterTable
ALTER TABLE "Container" ADD COLUMN     "thumbnailUuid" TEXT;

-- AlterTable
ALTER TABLE "PasswordReset" ALTER COLUMN "validUntil" SET DEFAULT (timezone('utc'::text, now()) + '1 days'::interval);

-- AddForeignKey
ALTER TABLE "PasswordReset" ADD CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_thumbnailUuid_fkey" FOREIGN KEY ("thumbnailUuid") REFERENCES "ImageUpload"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_containerUuid_fkey" FOREIGN KEY ("containerUuid") REFERENCES "Container"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeightRegistration" ADD CONSTRAINT "HeightRegistration_plantUuid_fkey" FOREIGN KEY ("plantUuid") REFERENCES "Plant"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvest" ADD CONSTRAINT "Harvest_plantUuid_fkey" FOREIGN KEY ("plantUuid") REFERENCES "Plant"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
