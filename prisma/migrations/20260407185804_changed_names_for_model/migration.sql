/*
  Warnings:

  - You are about to drop the column `client_name` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `client_phone` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `name` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "client_name",
DROP COLUMN "client_phone",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
