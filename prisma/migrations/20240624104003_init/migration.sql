-- CreateTable
CREATE TABLE "Testhm" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Testhm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testcd" (
    "id" SERIAL NOT NULL,
    "candidateName" TEXT NOT NULL,
    "imageCandidates" TEXT NOT NULL,
    "testhmId" INTEGER,

    CONSTRAINT "Testcd_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Testcd" ADD CONSTRAINT "Testcd_testhmId_fkey" FOREIGN KEY ("testhmId") REFERENCES "Testhm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
