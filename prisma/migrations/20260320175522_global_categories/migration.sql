/*
  Warnings:

  - You are about to drop the column `cabinetId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_cabinetId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "cabinetId";
