/*
  Warnings:

  - The values [Upgrade,Downgrade] on the enum `RegistrationOrigin` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."RegistrationOrigin_new" AS ENUM ('NEW', 'UPGRADE', 'DOWNGRADE');
ALTER TABLE "public"."Registration" ALTER COLUMN "origin" TYPE "public"."RegistrationOrigin_new" USING ("origin"::text::"public"."RegistrationOrigin_new");
ALTER TYPE "public"."RegistrationOrigin" RENAME TO "RegistrationOrigin_old";
ALTER TYPE "public"."RegistrationOrigin_new" RENAME TO "RegistrationOrigin";
DROP TYPE "public"."RegistrationOrigin_old";
COMMIT;
