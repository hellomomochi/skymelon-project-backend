/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Register` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_registerId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_classIdClass_fkey";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "Register";

-- DropTable
DROP TABLE "Song";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classvote" (
    "id" SERIAL NOT NULL,
    "classvote" TEXT NOT NULL,

    CONSTRAINT "Classvote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Choicevote" (
    "classvoteId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "choice" TEXT NOT NULL,

    CONSTRAINT "Choicevote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voter" (
    "userId" INTEGER NOT NULL,
    "choicevoteId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "countvote" INTEGER NOT NULL,

    CONSTRAINT "Voter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Classvote_classvote_key" ON "Classvote"("classvote");

-- CreateIndex
CREATE UNIQUE INDEX "Choicevote_choice_key" ON "Choicevote"("choice");

-- AddForeignKey
ALTER TABLE "Choicevote" ADD CONSTRAINT "Choicevote_classvoteId_fkey" FOREIGN KEY ("classvoteId") REFERENCES "Classvote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_choicevoteId_fkey" FOREIGN KEY ("choicevoteId") REFERENCES "Choicevote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
