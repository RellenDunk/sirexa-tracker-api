/*
  Warnings:

  - Added the required column `userName` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Registration" ADD COLUMN     "sessionPosition" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userName" TEXT NOT NULL;
