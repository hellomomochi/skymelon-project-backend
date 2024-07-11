/*
  Warnings:

  - A unique constraint covering the columns `[choice]` on the table `Choicevote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[classvote]` on the table `Classvote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Choicevote_choice_key" ON "Choicevote"("choice");

-- CreateIndex
CREATE UNIQUE INDEX "Classvote_classvote_key" ON "Classvote"("classvote");
