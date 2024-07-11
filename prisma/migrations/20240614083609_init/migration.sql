/*
  Warnings:

  - You are about to drop the `candidatekm11` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm12` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm13` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm14` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm21` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm22` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm23` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm24` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm31` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm32` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm33` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm34` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm41` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm42` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm43` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `candidatekm44` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "candidatekm11";

-- DropTable
DROP TABLE "candidatekm12";

-- DropTable
DROP TABLE "candidatekm13";

-- DropTable
DROP TABLE "candidatekm14";

-- DropTable
DROP TABLE "candidatekm21";

-- DropTable
DROP TABLE "candidatekm22";

-- DropTable
DROP TABLE "candidatekm23";

-- DropTable
DROP TABLE "candidatekm24";

-- DropTable
DROP TABLE "candidatekm31";

-- DropTable
DROP TABLE "candidatekm32";

-- DropTable
DROP TABLE "candidatekm33";

-- DropTable
DROP TABLE "candidatekm34";

-- DropTable
DROP TABLE "candidatekm41";

-- DropTable
DROP TABLE "candidatekm42";

-- DropTable
DROP TABLE "candidatekm43";

-- DropTable
DROP TABLE "candidatekm44";

-- CreateTable
CREATE TABLE "candidate" (
    "id" SERIAL NOT NULL,
    "voteroomkm" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("id")
);
