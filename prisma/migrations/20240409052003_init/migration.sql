/*
  Warnings:

  - You are about to drop the column `password` on the `Login` table. All the data in the column will be lost.
  - Added the required column `emailLogin` to the `Login` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordLogin` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Login" DROP COLUMN "password",
ADD COLUMN     "emailLogin" TEXT NOT NULL,
ADD COLUMN     "passwordLogin" TEXT NOT NULL;
