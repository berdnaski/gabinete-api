-- AlterTable
ALTER TABLE "demand_comments" ADD COLUMN     "isOfficialResponse" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "demands" ADD COLUMN     "supportGoal" INTEGER;

-- CreateTable
CREATE TABLE "demand_supports" (
    "id" TEXT NOT NULL,
    "demandId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demand_supports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "demand_supports_demandId_userId_key" ON "demand_supports"("demandId", "userId");

-- AddForeignKey
ALTER TABLE "demand_supports" ADD CONSTRAINT "demand_supports_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "demands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demand_supports" ADD CONSTRAINT "demand_supports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
