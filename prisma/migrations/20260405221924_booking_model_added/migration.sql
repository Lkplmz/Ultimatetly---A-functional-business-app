-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "client_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_date_key" ON "Booking"("date");
