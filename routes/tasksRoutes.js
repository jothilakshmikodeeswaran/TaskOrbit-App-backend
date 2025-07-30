import express from "express";
import { authMiddleware } from "../utils/auth.js";
import {
  createTask,
  getTasksByProject,
  updateTask,
  getAllTasks,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();
router.use(authMiddleware);


////   /api/tasks
router.post("/:projectId", createTask);
router.get("/", getAllTasks);
router.get("/:projectId", getTasksByProject);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;