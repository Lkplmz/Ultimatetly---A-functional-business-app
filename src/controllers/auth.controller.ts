import { Request, Response } from "express";
import z from "zod";

export const authRequest = async (req: Request, res: Response) => {
  try {
    const auth = z.NEVER;
  } catch (error) {}
};

export const checkLogin = async (req: Request, res: Response) => {
  try {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      res.send(404).json({ message: "User not found" });
      return;
    }
    res.send(200).json({ data: userId });
  } catch (error) {
    console.log(error);
  }
};
