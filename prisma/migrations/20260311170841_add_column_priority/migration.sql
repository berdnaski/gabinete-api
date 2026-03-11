-- CreateEnum
CREATE TYPE "DemandPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterTable
ALTER TABLE "demands" ADD COLUMN     "priority" "DemandPriority" NOT NULL DEFAULT 'LOW';
