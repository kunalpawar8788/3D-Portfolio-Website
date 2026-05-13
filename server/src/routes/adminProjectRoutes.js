import { Router } from "express";
import {
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/adminProjectController.js";

const router = Router();

router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
