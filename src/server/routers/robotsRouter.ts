import express from "express";
import {
  getRobot,
  getRobots,
  deleteRobot,
  createRobot,
} from "../controllers/robotsControllers.js";

// eslint-disable-next-line new-cap
const robotsRouter = express.Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:idRobot", getRobot);
robotsRouter.delete("/:idRobot", deleteRobot);
robotsRouter.post("/create", createRobot);

export default robotsRouter;
