/*
  Warnings:

  - You are about to drop the `candidate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "candidate";

-- CreateTable
CREATE TABLE "candidatekm31" (
    "id" SERIAL NOT NULL,
    "candidateNamekm31" TEXT NOT NULL,

    CONSTRAINT "candidatekm31_pkey" PRIMARY KEY ("id")
);
