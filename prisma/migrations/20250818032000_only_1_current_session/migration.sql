/*
  Warnings:

  - The primary key for the `currrentSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `currentSessionId` column on the `currrentSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `sessionId` to the `currrentSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."currrentSession" DROP CONSTRAINT "currrentSession_currentSessionId_fkey";

-- AlterTable
ALTER TABLE "public"."currrentSession" DROP CONSTRAINT "currrentSession_pkey",
ADD COLUMN     "sessionId" TEXT NOT NULL,
DROP COLUMN "currentSessionId",
ADD COLUMN     "currentSessionId" INTEGER NOT NULL DEFAULT 1,
ADD CONSTRAINT "currrentSession_pkey" PRIMARY KEY ("currentSessionId");

-- AddForeignKey
ALTER TABLE "public"."currrentSession" ADD CONSTRAINT "currrentSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
