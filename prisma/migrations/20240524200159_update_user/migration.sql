/*
  Warnings:

  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "updateAt",
ALTER COLUMN "consultas" DROP NOT NULL,
ALTER COLUMN "avatar" DROP NOT NULL;
