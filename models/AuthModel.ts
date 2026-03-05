import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  workspaces: [
    {
      type: Types.ObjectId,
      ref: "Workspace",
    },
  ],
});

const User = model("User", userSchema, "users");

export default User;