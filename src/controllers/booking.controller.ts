import { Request, Response } from "express";
import { checkAvailability } from "../services/booking.service";
import { BookingSchema } from "../schemas/booking.schema";
import { prisma } from "../lib/prisma";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";
import z, { ZodError } from "zod";
import { formatDate } from "../services/helpers";

export const createBooking = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const bookingRequest = BookingSchema.parseAsync(req.body);
    const isValid = await checkAvailability(await bookingRequest);

    if (!isValid) {
      console.log("NO SE PUEDE COMPLETAR LA SOLICITUD. YA ESTA RESERVADO");
      res
        .status(400)
        .json({ message: "No se pudo completar la solicitud; Esta reservado" });
      return;
    }

    const newBooking = await prisma.booking.create({
      data: {
        name: (await bookingRequest).name,
        email: (await bookingRequest).email,
        service_id: (await bookingRequest).service_id,
        date: (await bookingRequest).date,
      },
    });

    res.status(201).json({ data: newBooking });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error", error: "Datos no validos" });
  }
};

// find booking by date
// date = null return all the bookings
export const getBooking = async (req: Request, res: Response) => {
  try {
    let date = null;
    try {
      date = z.coerce.date().parse(req.query.date);
    } catch (error) {
      // harmless error (if its triggered means date = null)
      if (error instanceof ZodError) {
        if (
          error.issues[0].code != "invalid_type" &&
          error.issues[0].message !=
            "Invalid input: expected date, received Date"
        ) {
          res
            .status(500)
            .json({ message: "Error Fatal", error: "Internal server error" });
        }
      }
    }

    // lookup for all
    if (!date) {
      const allBookings = await prisma.booking.findMany();
      res.status(200).json(allBookings);
      return;
    }

    // lookup whre date=X
    const formattedDate = formatDate(date);
    const booking = await prisma.booking.findMany({
      where: { date: formattedDate },
    });
    // if db it outranged it triggers
    if (booking === null) {
      throw new RangeError("Out Of Range");
    }

    res.status(200).json(booking);
  } catch (error) {
    console.log(error);

    if (error instanceof RangeError) {
      if (error.message == "Out Of Range") {
        res.status(404).json({ message: "Not found" });
        return;
      }
    }

    if (error instanceof PrismaClientKnownRequestError) {
      res.status(500).json({ message: "Error", error: "Prisma error" });
      return;
    }

    res
      .status(500)
      .json({ message: "Error Fatal", error: "Error desconocido" });
  }
};
