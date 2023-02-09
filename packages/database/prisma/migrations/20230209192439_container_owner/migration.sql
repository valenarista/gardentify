-- CreateEnum
CREATE TYPE "ContainerType" AS ENUM ('Plot', 'Bag');

-- CreateEnum
CREATE TYPE "PlantType" AS ENUM ('NONE', 'TOMATO', 'POTATO', 'CARROT', 'ONION', 'CUCUMBER', 'PEPPER', 'PEA', 'BROCCOLI', 'CABBAGE', 'CORN', 'BEAN', 'BEET', 'CELERY', 'EGGPLANT', 'GARLIC', 'GINGER', 'GREEN_BEAN', 'KALE', 'LETTUCE', 'MUSTARD', 'SQUASH', 'WATERMELON');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Container" (
    "uuid" TEXT NOT NULL,
    "type" "ContainerType" NOT NULL,
    "dirthDepth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Plant" (
    "uuid" TEXT NOT NULL,
    "variety" TEXT NOT NULL,
    "type" "PlantType" NOT NULL,
    "plantedSeedsOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seedsSproutedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "containerUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("uuid")
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Container_userUuid_idx" ON "Container"("userUuid");

-- CreateIndex
CREATE INDEX "Plant_containerUuid_idx" ON "Plant"("containerUuid");

-- CreateIndex
CREATE INDEX "HeightRegistration_plantUuid_idx" ON "HeightRegistration"("plantUuid");
