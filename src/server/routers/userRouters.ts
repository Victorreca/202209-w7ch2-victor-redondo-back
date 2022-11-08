import express from "express";
import userLogin from "../controllers/userControllers/userControllers.js";

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.get("/login", userLogin);

export default userRouter;
