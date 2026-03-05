-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CABINET', 'USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cabinetId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "cabinets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cabinets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cabinets_slug_key" ON "cabinets"("slug");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cabinetId_fkey" FOREIGN KEY ("cabinetId") REFERENCES "cabinets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
