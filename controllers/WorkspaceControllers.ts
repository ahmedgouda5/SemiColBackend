import { Request, Response } from "express";
import Workspace from "../models/WorkSpaceModel.js";
import { asyncHandler } from "../Middlewares/AsyncHandler.js";

//! Create a new workspace
export const createWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceName, description } = req.body;

    if (!workspaceName || !description) {
      return res.status(400).json({
        message: "workspaceName and description are required",
      });
    }

    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized, user id not found in token" });
    }

    const workspace = await Workspace.create({
      workspaceName,
      description,
      user: req.userId,
    });

    return res
      .status(201)
      .json({ message: "Workspace created successfully", workspace });
  }
);

//! Get all workspaces for the authenticated user
export const getAllWorkspacesController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized, user id not found in token" });
    }

    const workspaces = await Workspace.find({ user: req.userId });
    return res.status(200).json({
      message: "Workspaces fetched successfully",
      workspaces,
    });
  }
);

//! Get a single workspace by ID
export const getWorkspaceByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    return res.status(200).json({
      message: "Workspace fetched successfully",
      workspace,
    });
  }
);

//! Update a workspace
export const updateWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { workspaceName, description } = req.body;

    const updateData: {
      workspaceName?: string;
      description?: string;
    } = {};

    if (workspaceName !== undefined) updateData.workspaceName = workspaceName;
    if (description !== undefined) updateData.description = description;

    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedWorkspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    return res.status(200).json({
      message: "Workspace updated successfully",
      workspace: updatedWorkspace,
    });
  }
);

//! Delete a workspace
export const deleteWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedWorkspace = await Workspace.findByIdAndDelete(id);

    if (!deletedWorkspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    return res
      .status(200)
      .json({ message: "Workspace deleted successfully" });
  }
);

