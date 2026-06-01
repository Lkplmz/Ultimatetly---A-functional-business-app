import { BookingStatus } from "../../generated/prisma/enums";

export interface Booking {
  name: string;
  email: string;
  service_id: Service["id"];
  date: Date;
  status: BookingStatus;
}

export interface Service {
  id?: number;
  name: string;
  price: number;
  description: string;
  active: boolean;
}
