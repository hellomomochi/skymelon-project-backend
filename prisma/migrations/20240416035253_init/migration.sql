/*
  Warnings:

  - You are about to drop the `Login` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `registerId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_loginId_fkey";

-- DropForeignKey
ALTER TABLE "Login" DROP CONSTRAINT "Login_registerId_fkey";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "registerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Login";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "Register"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
