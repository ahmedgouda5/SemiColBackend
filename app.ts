import express from "express";
import taskRouter from "./routes/tasks.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/tasks", taskRouter);

app.get("/", (_req, res) => {
  res.json({ message: "Task API running" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
