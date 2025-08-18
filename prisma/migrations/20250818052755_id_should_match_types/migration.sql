/*
  Warnings:

  - Changed the type of `currentServerId` on the `CurrentServer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."CurrentServer" DROP COLUMN "currentServerId",
ADD COLUMN     "currentServerId" INTEGER NOT NULL;
