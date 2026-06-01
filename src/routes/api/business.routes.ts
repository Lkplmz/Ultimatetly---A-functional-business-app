import { Router } from "express";
import { getBusinessInfo } from "../../controllers/business.controller";
const router = Router();

// AT "localhost:5000/api/business/"
router.get("/get", getBusinessInfo);

export default router;
