-- DropIndex
DROP INDEX "Booking_date_key";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "date" SET DATA TYPE TEXT;
