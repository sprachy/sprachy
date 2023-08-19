-- CreateTable
CREATE TABLE "TaskDefVQA" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "questionDe" TEXT NOT NULL,
    "answerEn" TEXT NOT NULL,
    "answerDe" TEXT NOT NULL,

    CONSTRAINT "TaskDefVQA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnedLemma" (
    "lemma" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ProgressItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "patternId" TEXT NOT NULL,
    "initiallyLearnedAt" INTEGER NOT NULL,
    "lastExperienceGainAt" INTEGER NOT NULL,
    "lastLeveledAt" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,

    CONSTRAINT "ProgressItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LearnedLemma_lemma_userId_key" ON "LearnedLemma"("lemma", "userId");

-- AddForeignKey
ALTER TABLE "LearnedLemma" ADD CONSTRAINT "LearnedLemma_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressItem" ADD CONSTRAINT "ProgressItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
