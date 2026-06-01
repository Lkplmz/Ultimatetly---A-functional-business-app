import { Router } from "express";

import AuthRoutes from "./auth.routes";

const router = Router();

// AT /auth/"

router.get("/", AuthRoutes);

export default router;
