-- CreateTable
CREATE TABLE "public"."currrentSession" (
    "currentSessionId" TEXT NOT NULL,

    CONSTRAINT "currrentSession_pkey" PRIMARY KEY ("currentSessionId")
);

-- AddForeignKey
ALTER TABLE "public"."currrentSession" ADD CONSTRAINT "currrentSession_currentSessionId_fkey" FOREIGN KEY ("currentSessionId") REFERENCES "public"."Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
