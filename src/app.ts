import express from "express";
import morgan from "morgan";
import cors from "cors";
import "./loadEnvironment.js";
import { generalError, notFoundError } from "./server/middleware/errors.js";
import robotsRouter from "./server/routers/robotsRouter.js";
import userRouter from "./server/routers/userRouters.js";

const app = express();
app.use(cors());
app.disable("x-powered-by");

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/robots", robotsRouter);

app.use(generalError);
app.use(notFoundError);

export default app;
