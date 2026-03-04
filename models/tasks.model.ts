import { Schema, model, Types } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    dueDate: {
      type: Date,
      required: true,
    },

    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } 
);

const Task = model("Task", TaskSchema);

export default Task;