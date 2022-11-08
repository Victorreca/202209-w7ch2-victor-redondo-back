import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Robot from "../../database/model/Robots.js";
import jwt from "jsonwebtoken";

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const robots = await Robot.find();
    res.status(200).json({ robots });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Mongo ha petat"
    );
    next(customError);
  }
};

export const getRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;

  try {
    const robot = await Robot.findById(idRobot);

    if (!robot) {
      res.status(404).json({ message: "Robot not found" });
      return;
    }

    res.status(200).json({ robot });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Mongo ha petat"
    );
    next(customError);
  }
};

export const deleteRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;
  // Const { token } = req.query;

  try {
    // If (token !== process.env.TOKKEN_AUTH) {
    //   res.status(498).json({ message: "Incorrect tokken" });
    //   return;
    // }

    const authHeader = req.header("Authorization");

    if (!authHeader) {
      const error = new CustomError(
        "Token is missing",
        401,
        "Token is missing"
      );
      throw error;
    }

    const token = authHeader.replace(/^Bearer:\s*/, "");

    if (!token) {
      const error = new CustomError(
        "Token is missing",
        401,
        "Token is missing"
      );
      throw error;
    }

    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, (error) => {
      if (error) {
        throw new CustomError("Unauthorized token", 401, "Unauthorized token");
      }
    });

    const robot = await Robot.findById(idRobot);

    // If (!robot) {
    //   res.status(404).json({ message: "Robot not found" });
    //   return;
    // }

    await Robot.findByIdAndDelete(idRobot);
    res.status(200).json({ robot });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Mongo ha petat"
    );
    next(customError);
  }
};

export const createRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;
  try {
    if (token !== process.env.TOKKEN_AUTH) {
      res.status(498).json({ message: "Incorrect tokken" });
      return;
    }

    const newRobot = new Robot(req.body);

    await newRobot.save();

    res.status(200).json({ newRobot });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Mongo ha petat"
    );
    next(customError);
  }
};
