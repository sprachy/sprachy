/*
  Warnings:

  - You are about to drop the `VQATaskDef` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VQATaskDef";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TaskDefVQA" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageId" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "questionDe" TEXT NOT NULL,
    "answerEn" TEXT NOT NULL,
    "answerDe" TEXT NOT NULL
);
