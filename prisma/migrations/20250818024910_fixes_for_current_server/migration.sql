/*
  Warnings:

  - The primary key for the `CurrentServer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `currentServerName` to the `CurrentServer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CurrentServer" DROP CONSTRAINT "CurrentServer_currentServerId_fkey";

-- AlterTable
ALTER TABLE "public"."CurrentServer" DROP CONSTRAINT "CurrentServer_pkey",
ADD COLUMN     "currentServerName" TEXT NOT NULL,
ADD COLUMN     "id" INTEGER NOT NULL DEFAULT 1,
ADD CONSTRAINT "CurrentServer_pkey" PRIMARY KEY ("id");
