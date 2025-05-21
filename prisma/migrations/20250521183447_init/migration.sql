-- CreateEnum
CREATE TYPE "appeal_status" AS ENUM ('new', 'in_working', 'completed', 'cancelled');

-- CreateTable
CREATE TABLE "appeals" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "appeal_status" NOT NULL DEFAULT 'new',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appeal_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "appeals_id_key" ON "appeals"("id");

-- CreateIndex
CREATE UNIQUE INDEX "answers_id_key" ON "answers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "answers_appeal_id_key" ON "answers"("appeal_id");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_appeal_id_fkey" FOREIGN KEY ("appeal_id") REFERENCES "appeals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
