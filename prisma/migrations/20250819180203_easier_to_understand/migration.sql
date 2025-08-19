/*
  Warnings:

  - The primary key for the `CurrrentSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `currentSessionId` on the `CurrrentSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."CurrrentSession" DROP CONSTRAINT "CurrrentSession_pkey",
DROP COLUMN "currentSessionId",
ADD COLUMN     "id" INTEGER NOT NULL DEFAULT 1,
ADD CONSTRAINT "CurrrentSession_pkey" PRIMARY KEY ("id");
