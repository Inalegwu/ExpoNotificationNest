/*
  Warnings:

  - Added the required column `user_token` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "user_token" TEXT NOT NULL;
