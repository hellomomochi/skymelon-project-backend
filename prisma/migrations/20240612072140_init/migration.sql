-- CreateTable
CREATE TABLE "Voteroom" (
    "id" SERIAL NOT NULL,
    "passroom" TEXT NOT NULL,
    "roomname" TEXT NOT NULL,
    "roomimage" TEXT NOT NULL,

    CONSTRAINT "Voteroom_pkey" PRIMARY KEY ("id")
);
