/*
  Warnings:

  - You are about to drop the column `sessionLogId` on the `Registration` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."RegistrationSessionStatus" AS ENUM ('ACTIVE', 'DEREGISTERED');

-- DropForeignKey
ALTER TABLE "public"."Registration" DROP CONSTRAINT "Registration_sessionLogId_fkey";

-- AlterTable
ALTER TABLE "public"."Registration" DROP COLUMN "sessionLogId",
ADD COLUMN     "sessionStatus" "public"."RegistrationSessionStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."Session" ADD COLUMN     "currentNumUsers" INTEGER NOT NULL DEFAULT 0;
