/*
  Warnings:

  - A unique constraint covering the columns `[characterName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `characterName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "characterName" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_characterName_key" ON "public"."User"("characterName");
