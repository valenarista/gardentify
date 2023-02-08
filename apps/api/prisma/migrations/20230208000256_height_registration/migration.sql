-- CreateTable
CREATE TABLE "HeightRegistration" (
    "uuid" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "plantUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeightRegistration_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "HeightRegistration_plantUuid_idx" ON "HeightRegistration"("plantUuid");

-- CreateIndex
CREATE INDEX "Plant_containerUuid_idx" ON "Plant"("containerUuid");
