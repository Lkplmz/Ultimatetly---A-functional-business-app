import * as z from "zod";
import { BookingStatus } from "../generated/prisma/enums";

export const BookingSchema = z.object({
  name: z.string(),
  email: z.email(),
  service_id: z.number(),
  status: z.enum(BookingStatus).default("PENDING"),
  date: z.coerce.date(),
});
