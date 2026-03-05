import { Router } from "express";
import {
  createWorkspaceController,
  deleteWorkspaceController,
  getAllWorkspacesController,
  getWorkspaceByIdController,
  updateWorkspaceController,
} from "../controllers/WorkspaceControllers.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

const WorkspaceRouter = Router();

// All workspace routes are protected and use the user id from the verified token
WorkspaceRouter.get("/", verifyToken, getAllWorkspacesController);
WorkspaceRouter.get("/:id", verifyToken, getWorkspaceByIdController);
WorkspaceRouter.post("/", verifyToken, createWorkspaceController);
WorkspaceRouter.put("/:id", verifyToken, updateWorkspaceController);
WorkspaceRouter.delete("/:id", verifyToken, deleteWorkspaceController);

export default WorkspaceRouter;

