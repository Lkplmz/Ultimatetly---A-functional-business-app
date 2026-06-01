/*
  Warnings:

  - You are about to drop the column `phone` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `business_config` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "phone",
ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "business_config";

-- CreateTable
CREATE TABLE "BusinessConfig" (
    "id" TEXT NOT NULL DEFAULT 'SETTINGS',
    "businessName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "operatingHours" JSONB NOT NULL,
    "totalRevenue" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',

    CONSTRAINT "BusinessConfig_pkey" PRIMARY KEY ("id")
);
