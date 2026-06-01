/*
  Warnings:

  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Business";

-- CreateTable
CREATE TABLE "business_config" (
    "id" TEXT NOT NULL DEFAULT 'SETTINGS',
    "businessName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "operatingHours" JSONB NOT NULL,
    "totalRevenue" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_config_pkey" PRIMARY KEY ("id")
);
