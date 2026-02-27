import { Request, Response } from "express";
import {
  createTaskRecord,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "../ulitis/tasks.js";

export const createTask = (req: Request, res: Response): void => {
  const { title, description } = req.body ?? {};
   console.log(title);
   
  if (!title || typeof title !== "string") {
    res.status(400).json({ message: "title is required and must be a string" });
    return;
  }

  const task = createTaskRecord({ title: title.trim(), description });
  res.status(201).json(task);
};

export const getTasks = (_req: Request, res: Response): void => {
  res.json(getAllTasks());
};

export const getTask = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "invalid task id" });
    return;
  }

  const task = getTaskById(id);
  if (!task) {
    res.status(404).json({ message: "task not found" });
    return;
  }

  res.json(task);
};

export const updateTask = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "invalid task id" });
    return;
  }

  const { title, description, completed } = req.body ?? {};
  const updates: {
    title?: string;
    description?: string;
    completed?: boolean;
  } = {};

  if (typeof title !== "undefined") updates.title = title;
  if (typeof description !== "undefined") updates.description = description;
  if (typeof completed !== "undefined") updates.completed = completed;

  const task = updateTaskById(id, updates);
  if (!task) {
    res.status(404).json({ message: "task not found" });
    return;
  }

  res.json(task);
};

export const deleteTask = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "invalid task id" });
    return;
  }

  const deleted = deleteTaskById(id);
  if (!deleted) {
    res.status(404).json({ message: "task not found" });
    return;
  }

  res.json({ message: "task deleted", task: deleted });
};
