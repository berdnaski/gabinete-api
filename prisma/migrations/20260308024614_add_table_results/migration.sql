-- CreateEnum
CREATE TYPE "ResultType" AS ENUM ('INFRASTRUCTURE', 'SOCIAL', 'LEGISLATIVE', 'OTHER');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('BEFORE', 'AFTER', 'GENERAL');

-- CreateTable
CREATE TABLE "ResultImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" "ImageType" NOT NULL DEFAULT 'GENERAL',
    "resultId" TEXT NOT NULL,

    CONSTRAINT "ResultImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "results" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ResultType" NOT NULL DEFAULT 'INFRASTRUCTURE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "cabinetId" TEXT NOT NULL,
    "demandId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "results_demandId_key" ON "results"("demandId");

-- AddForeignKey
ALTER TABLE "ResultImage" ADD CONSTRAINT "ResultImage_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_cabinetId_fkey" FOREIGN KEY ("cabinetId") REFERENCES "cabinets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "demands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
