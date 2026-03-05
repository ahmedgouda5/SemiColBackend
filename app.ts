import express from "express";
import dotenv from "dotenv";
import { Error } from "mongoose";
import mongoose from "mongoose";
import AuthRouter from "./routes/Auth.router.js";
import TaskRouter from "./routes/Task.router.js";
import WorkspaceRouter from "./routes/Workspace.router.js";
import { errorHandlerdler } from "./Middlewares/Error.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

const DB_URL = process.env.DB_URL ?? "";
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: Error) => {
    console.log(err);
  });
app.use("/Auth", AuthRouter);
app.use("/tasks", TaskRouter);
app.use("/workspaces", WorkspaceRouter);

app.get("/", (_req, res) => {
  return res.status(200).json({ message: "Task API running" });
});

app.use(errorHandlerdler);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
