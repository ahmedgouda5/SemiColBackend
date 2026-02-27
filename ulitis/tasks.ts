export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

const tasks: Task[] = [];
let nextId = 1;

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: number): Task | undefined =>
  tasks.find((task) => task.id === id);

export const createTaskRecord = (input: CreateTaskInput): Task => {
  const now = new Date().toISOString();
  const newTask: Task = {
    id: nextId++,
    title: input.title,
    description: input.description ?? "",
    completed: false,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  return newTask;
};

export const updateTaskById = (
  id: number,
  updates: UpdateTaskInput,
): Task | undefined => {
  const task = getTaskById(id);
  if (!task) return undefined;

  if (typeof updates.title !== "undefined") task.title = updates.title;
  if (typeof updates.description !== "undefined") {
    task.description = updates.description;
  }
  if (typeof updates.completed !== "undefined") {
    task.completed = updates.completed;
  }
  task.updatedAt = new Date().toISOString();

  return task;
};

export const deleteTaskById = (id: number): Task | undefined => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return undefined;

  const [deleted] = tasks.splice(index, 1);
  return deleted;
};
