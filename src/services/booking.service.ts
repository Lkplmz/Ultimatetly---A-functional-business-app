import { prisma } from "../lib/prisma";
import { BookingSchema } from "../schemas/booking.schema";
import { Booking } from "../schemas/types/types";

export async function checkAvailability(booking: Booking) {
  const validated = BookingSchema.parse(booking);

  const count = await prisma.booking.count({
    where: {
      date: validated.date,
    },
  });

  return count === 0;
}
