/*
  Warnings:

  - Added the required column `client_phone` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "client_phone" TEXT NOT NULL;
