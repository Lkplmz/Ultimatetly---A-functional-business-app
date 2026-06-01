/*
  Warnings:

  - You are about to drop the column `service_name` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `service_id` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_service_name_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "service_name",
ADD COLUMN     "service_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
