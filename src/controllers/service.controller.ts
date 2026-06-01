import { Request, Response } from "express";
import { ServiceSchema } from "../schemas/service.schema";
import { checkServiceValidity } from "../services/service.service";
import { prisma } from "../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import z, { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";

export const createService = async (req: Request, res: Response) => {
  try {
    const serviceRequest = ServiceSchema.parse(req.body);
    const valid = await checkServiceValidity(serviceRequest);

    if (!valid) {
      res.status(400).json({ message: "El servicio ya existe" });
      return;
    }

    const newService = await prisma.service.create({
      data: {
        name: serviceRequest.name,
        price: serviceRequest.price,
        active: serviceRequest.active,
        description: serviceRequest.description,
      },
    });

    res.status(201).json({ message: "Success", data: newService });
  } catch (err) {
    console.log(err);
  }
};

export const findService = async (req: Request, res: Response) => {
  try {
    let name = null;
    try {
      let name = z.string().parse(req.query.name);
    } catch (error) {
      if (error instanceof ZodError) {
        if (
          error.issues[0].code != "invalid_type" &&
          error.issues[0].message !=
            "Invalid input: expected date, received Date"
        ) {
          res
            .status(500)
            .json({ message: "Error Fatal", error: "Internal server error" });
          return;
        }
      }
    }

    // lookup for all
    if (!name) {
      const allServices = await prisma.service.findMany();

      res.status(200).json(allServices);
      return;
    }

    // lookup where name=X
    const service = await prisma.service.findUnique({
      where: { name: name },
    });

    res.status(200).json(service);
  } catch (error) {
    console.log(error);

    if (error instanceof PrismaClientKnownRequestError) {
      res.status(500).json({ message: "Error", error: "Prisma error" });
    } else {
      res
        .status(500)
        .json({ message: "Error Fatal", error: "Error desconocido" });
    }
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = z.object({ id: z.number() }).parse(req.body);

    const deleted = await prisma.service.delete({ where: { id: id } });

    res.status(200).json({ message: "Deleted", data: deleted });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "ID inválido", errors: error.issues });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Código P2025: "An operation failed because it depends on one or more records that were not found"
      if (error.code === "P2025") {
        return res
          .status(404)
          .json({ message: "El servicio no existe o ya fue eliminado" });
      }
    }
    console.log(error);
    res.status(500).json({ message: "Error", error: error });
  }
};

export const editService = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const formData = ServiceSchema.parse(req.body.formData);

    const serv = await prisma.service.update({
      data: {
        name: formData.name,
        price: formData.price,
        active: formData.active,
        description: formData.description,
      },
      where: { name: formData.name },
    });

    res.status(200).json({ message: "Edited correctly", data: serv });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("Prisma Error \n", error);
      res.status(500).json({ message: "Ocurrio un error", error: error });
      return;
    }
    res.status(500).json({ message: "Error fatal", error: error });
    console.log(error);
  }
};

export const toggleStatus = async (req: Request, res: Response) => {
  try {
    const { id } = z.object({ id: z.number() }).parse(req.body);

    const service = await prisma.service.findUnique({ where: { id: id } });
    const update = await prisma.service.update({
      data: { active: !service?.active },
      where: { id: id },
    });

    res.status(200).json({ message: "success", data: update });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
