/*
  Warnings:

  - Added the required column `branchtime` to the `keeptime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "keeptime" ADD COLUMN     "branchtime" TEXT NOT NULL;
