import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const userLogin = async (req: Request, res: Response) => {
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign({}, secret);

  res.status(200).json({ token });
};

export default userLogin;
