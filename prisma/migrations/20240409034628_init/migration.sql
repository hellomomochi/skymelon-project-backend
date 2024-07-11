/*
  Warnings:

  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_userId_fkey";

-- DropTable
DROP TABLE "Invoice";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Register" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Login" (
    "id" SERIAL NOT NULL,
    "registerId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "loginId" INTEGER NOT NULL,
    "idClass" SERIAL NOT NULL,
    "class" TEXT NOT NULL,
    "vote" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("idClass")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "songName" TEXT NOT NULL,
    "artistSong" TEXT NOT NULL,
    "classIdClass" INTEGER NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Register_username_key" ON "Register"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Register_email_key" ON "Register"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Song_songName_key" ON "Song"("songName");

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "Register"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_classIdClass_fkey" FOREIGN KEY ("classIdClass") REFERENCES "Class"("idClass") ON DELETE RESTRICT ON UPDATE CASCADE;
