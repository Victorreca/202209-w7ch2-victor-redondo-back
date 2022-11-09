import express from "express";
// Import userLogin from "../controllers/userControllers/userControllers.js";
import { loginUser } from "../controllers/userControllers/usersControllers.js";

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post("/login", loginUser);

export default userRouter;
