-- DropForeignKey
ALTER TABLE "demands" DROP CONSTRAINT "demands_reporterId_fkey";

-- AlterTable
ALTER TABLE "demands" ADD COLUMN     "assigneeId" TEXT;

-- CreateTable
CREATE TABLE "demand_evidences" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "demandId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demand_evidences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demand_comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "demandId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "demand_comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "demands" ADD CONSTRAINT "demands_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demands" ADD CONSTRAINT "demands_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demand_evidences" ADD CONSTRAINT "demand_evidences_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "demands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demand_comments" ADD CONSTRAINT "demand_comments_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "demands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demand_comments" ADD CONSTRAINT "demand_comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
