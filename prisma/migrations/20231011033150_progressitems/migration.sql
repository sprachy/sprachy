/*
  Warnings:

  - The primary key for the `ProgressItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProgressItem` table. All the data in the column will be lost.
  - You are about to drop the column `lastLeveledAt` on the `ProgressItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,patternId]` on the table `ProgressItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProgressItem" DROP CONSTRAINT "ProgressItem_pkey",
DROP COLUMN "id",
DROP COLUMN "lastLeveledAt";

-- CreateIndex
CREATE UNIQUE INDEX "ProgressItem_userId_patternId_key" ON "ProgressItem"("userId", "patternId");
