import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import CustomError from "../../CustomError/CustomError.js";
import User from "../../database/model/User.js";
import type { Credentials } from "./types";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as Credentials;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new CustomError(
      "Username not found",
      401,
      "Wrong credentials"
    );
    next(error);
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const error = new CustomError(
      "Password is incorrect",
      401,
      "Wrong credentials"
    );
    next(error);
  }
};