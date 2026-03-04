import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/TaskControllers.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

const TaskRouter = Router();

// All task routes are protected and use the user id from the verified token
TaskRouter.get("/", verifyToken, getAllTasksController);
TaskRouter.get("/:id", verifyToken, getTaskByIdController);
TaskRouter.post("/", verifyToken, createTaskController);
TaskRouter.put("/:id", verifyToken, updateTaskController);
TaskRouter.delete("/:id", verifyToken, deleteTaskController);

export default TaskRouter;

