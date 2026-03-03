import { Router } from "express";
import { getAllUsersController, loginController, registerController } from "../controllers/AuthControllers.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

const AuthRouter = Router();

AuthRouter.get("/users",verifyToken, getAllUsersController);

AuthRouter.post("/login", loginController);
AuthRouter.post("/register", registerController);   


export default AuthRouter;