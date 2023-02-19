-- CreateTable
CREATE TABLE "ProgressItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "patternId" TEXT NOT NULL,
    "initiallyLearnedAt" INTEGER NOT NULL,
    "lastExperienceGainAt" INTEGER NOT NULL,
    "lastLeveledAt" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    CONSTRAINT "ProgressItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
