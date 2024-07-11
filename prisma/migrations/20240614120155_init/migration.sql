/*
  Warnings:

  - You are about to drop the column `choicevoteId` on the `Voter` table. All the data in the column will be lost.
  - You are about to drop the `Choicevote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Classvote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `choice` to the `Voter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classvote` to the `Voter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Choicevote" DROP CONSTRAINT "Choicevote_classvoteId_fkey";

-- DropForeignKey
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_choicevoteId_fkey";

-- AlterTable
ALTER TABLE "Voter" DROP COLUMN "choicevoteId",
ADD COLUMN     "choice" TEXT NOT NULL,
ADD COLUMN     "classvote" TEXT NOT NULL;

-- DropTable
DROP TABLE "Choicevote";

-- DropTable
DROP TABLE "Classvote";

-- DropTable
DROP TABLE "candidate";

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "voteroomkm" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);
