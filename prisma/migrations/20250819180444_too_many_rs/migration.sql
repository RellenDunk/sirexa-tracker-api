/*
  Warnings:

  - You are about to drop the `CurrrentSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CurrrentSession" DROP CONSTRAINT "CurrrentSession_sessionId_fkey";

-- DropTable
DROP TABLE "public"."CurrrentSession";

-- CreateTable
CREATE TABLE "public"."CurrentSession" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "CurrentSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CurrentSession" ADD CONSTRAINT "CurrentSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
