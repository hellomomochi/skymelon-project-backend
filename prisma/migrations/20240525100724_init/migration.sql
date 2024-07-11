/*
  Warnings:

  - You are about to drop the column `candidateNamekm33` on the `candidatekm32` table. All the data in the column will be lost.
  - Added the required column `candidateNamekm32` to the `candidatekm32` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidatekm32" DROP COLUMN "candidateNamekm33",
ADD COLUMN     "candidateNamekm32" TEXT NOT NULL;
