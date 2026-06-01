import { Router } from "express";
import { authRequest, checkLogin } from "../../controllers/auth.controller";
const router = Router();

router.get("/request", checkLogin);
router.post("/", authRequest);

export default router;
