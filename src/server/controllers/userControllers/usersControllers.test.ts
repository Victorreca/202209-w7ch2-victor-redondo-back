import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import CustomError from "../../../CustomError/CustomError.js";
import User from "../../../database/model/User.js";
import mockUser from "../../../mocks/mockUser.js";
import { loginUser } from "./usersControllers.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnValue(mockUser),
};

const next = jest.fn();

describe("Given a loginUser controller", () => {
  describe("When it receives a response and unknown id", () => {
    test("Then it should return the message 'Username not found' with code 401", async () => {
      const req = {
        body: {},
      };

      const expectedCustomError = new CustomError(
        "Username not found",
        401,
        "Wrong credentials"
      );

      User.findOne = jest.fn();
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });

  describe("When it receives a response", () => {
    test("Then it should call its method with a 200 status code", async () => {
      const req = {
        body: {
          username: "Pedro",
          password: "1234",
        },
      };

      const expectedStatus = 200;

      User.findOne = jest.fn().mockResolvedValueOnce(mockUser);
      bcrypt.compare = jest.fn().mockResolvedValueOnce(true);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
