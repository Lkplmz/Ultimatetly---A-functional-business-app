import { Router } from "express";

import BookingRoutes from "./booking.routes";
import ServiceRoutes from "./service.routes";
import BusinessRoutes from "./business.routes";

const router = Router();

// AT /api/"

router.use("/service", ServiceRoutes);
router.use("/booking", BookingRoutes);
router.use("/business", BusinessRoutes);

export default router;
