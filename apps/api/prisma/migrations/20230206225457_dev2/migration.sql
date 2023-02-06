-- CreateEnum
CREATE TYPE "ContainerType" AS ENUM ('Plot', 'Bag');

-- CreateTable
CREATE TABLE "Container" (
    "uuid" TEXT NOT NULL,
    "type" "ContainerType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("uuid")
);
