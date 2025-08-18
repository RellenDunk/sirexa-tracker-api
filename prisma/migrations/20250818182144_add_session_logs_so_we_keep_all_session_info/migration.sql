/*
  Warnings:

  - Added the required column `sessionLogId` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Registration" ADD COLUMN     "sessionLogId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Registration" ADD CONSTRAINT "Registration_sessionLogId_fkey" FOREIGN KEY ("sessionLogId") REFERENCES "public"."Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
