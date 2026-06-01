import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Request, Response } from "express";
import { getBusinessSettings } from "../services/business.service";

export const getBusinessInfo = async (req: Request, res: Response) => {
  try {
    const info = await getBusinessSettings();
    res.status(200).json({ message: "Success", data: info });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(500).json({ message: "Prisma Error", error: error });
      return;
    }
    res.status(500).json({ message: "Fatal Error", error: error });
  }
};
