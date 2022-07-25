import { Router } from "express";
import {
  count,
  createTask,
  deleteTasks,
  getTask,
  getTasks,
  updateTasks,
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/tasks", getTasks);
router.get("/tasks/count", count);
router.get("/tasks/:id", getTask);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTasks);
router.delete("/tasks/:id", deleteTasks);

export default router;
