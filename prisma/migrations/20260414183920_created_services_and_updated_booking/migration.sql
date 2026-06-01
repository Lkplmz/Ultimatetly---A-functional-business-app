/*
  Warnings:

  - You are about to drop the column `hour` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `service_name` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "hour",
ADD COLUMN     "service_name" TEXT NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_date_key" ON "Booking"("date");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_service_name_fkey" FOREIGN KEY ("service_name") REFERENCES "Service"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
