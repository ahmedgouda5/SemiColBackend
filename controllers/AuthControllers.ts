import { Request, Response } from "express";
import User from "../models/AuthModel.js";
import { asyncHandler } from "../Middlewares/AsyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utilis/HashPassword.js";


//! Get all users
 export const getAllUsersController = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    return res.status(200).json({ message: "Users fetched successfully", users });
});

//! Login

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Invalid email or password" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
});




//! Register

export const registerController = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email and password are required" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

  return res.status(201).json({
    message: "Register successful",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    token,
  });
});