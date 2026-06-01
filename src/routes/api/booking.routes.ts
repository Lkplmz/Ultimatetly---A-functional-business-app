import { Router } from "express";
import {
  createBooking,
  getBooking,
} from "../../controllers/booking.controller";
const router = Router();

// AT "localhost:5000/api/booking/"
router.get("/get", getBooking);
router.post("/create", createBooking);

export default router;
