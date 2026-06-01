import { Router } from "express";
import {
  createService,
  deleteService,
  editService,
  findService,
  toggleStatus,
} from "../../controllers/service.controller";
const router = Router();

// AT "/api/service"

router.get("/get", findService);
router.post("/create", createService);
router.delete("/delete", deleteService);
router.put("/edit", editService);

router.put("/toggleStatus", toggleStatus);

export default router;
