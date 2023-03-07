-- CreateTable
CREATE TABLE "LearnedLemma" (
    "lemma" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "LearnedLemma_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "LearnedLemma_lemma_userId_key" ON "LearnedLemma"("lemma", "userId");
