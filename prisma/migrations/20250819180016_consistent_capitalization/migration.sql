/*
  Warnings:

  - You are about to drop the `banAppealMeeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `currrentSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."banAppealMeeting" DROP CONSTRAINT "banAppealMeeting_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."currrentSession" DROP CONSTRAINT "currrentSession_sessionId_fkey";

-- DropTable
DROP TABLE "public"."banAppealMeeting";

-- DropTable
DROP TABLE "public"."currrentSession";

-- CreateTable
CREATE TABLE "public"."CurrrentSession" (
    "currentSessionId" INTEGER NOT NULL DEFAULT 1,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "CurrrentSession_pkey" PRIMARY KEY ("currentSessionId")
);

-- CreateTable
CREATE TABLE "public"."BanAppealMeeting" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "meetingDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BanAppealMeeting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CurrrentSession" ADD CONSTRAINT "CurrrentSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BanAppealMeeting" ADD CONSTRAINT "BanAppealMeeting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
