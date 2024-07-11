/*
  Warnings:

  - You are about to drop the `Testcd` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Testhm` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[resetToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailVerificationToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `checkVerification` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Testcd" DROP CONSTRAINT "Testcd_testhmId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "checkVerification" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Testcd";

-- DropTable
DROP TABLE "Testhm";

-- CreateTable
CREATE TABLE "Homeroom" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Homeroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidateroom" (
    "id" SERIAL NOT NULL,
    "candidateName" TEXT NOT NULL,
    "imageCandidates" TEXT NOT NULL,
    "homeroomId" INTEGER,

    CONSTRAINT "Candidateroom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Homeroom_code_key" ON "Homeroom"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Homeroom_branch_key" ON "Homeroom"("branch");

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailVerificationToken_key" ON "User"("emailVerificationToken");

-- AddForeignKey
ALTER TABLE "Candidateroom" ADD CONSTRAINT "Candidateroom_homeroomId_fkey" FOREIGN KEY ("homeroomId") REFERENCES "Homeroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
