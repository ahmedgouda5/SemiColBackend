import { Request, Response } from "express";
import Task from "../models/tasks.model.js";
import { asyncHandler } from "../Middlewares/AsyncHandler.js";

//! Create a new task
export const createTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        message: "title, description and dueDate are required",
      });
    }

    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized, user id not found in token" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      user: req.userId,
    });

    return res
      .status(201)
      .json({ message: "Task created successfully", task });
  }
);

//! Get all tasks for the authenticated user
export const getAllTasksController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized, user id not found in token" });
    }

    const tasks = await Task.find({ user: req.userId });
    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", tasks });
  }
);

//! Get a single task by ID
export const getTaskByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res
      .status(200)
      .json({ message: "Task fetched successfully", task });
  }
);

//! Update a task
export const updateTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const updateData: {
      title?: string;
      description?: string;
      status?: string;
      dueDate?: Date;
    } = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (dueDate !== undefined) updateData.dueDate = dueDate;

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  }
);

//! Delete a task
export const deleteTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res
      .status(200)
      .json({ message: "Task deleted successfully" });
  }
);
