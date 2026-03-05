import { Schema, model, Types } from "mongoose";

const WorkSpaceSchema = new Schema(
  {
    workspaceName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Workspace = model("Workspace", WorkSpaceSchema);

export default Workspace;
