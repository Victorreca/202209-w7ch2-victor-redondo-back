import type { NextFunction, Request, Response } from "express";
import Robot from "../../database/model/Robots.js";
import mockRobot from "../../mocks/mockRobot.js";
import {
  getRobot,
  getRobots,
  deleteRobot,
  createRobot,
} from "./robotsControllers.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnValue(mockRobot),
};
const next = jest.fn();

describe("Given a getRobots controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method status with a 200 status code", async () => {
      const expectedStatus = 200;

      Robot.find = jest.fn().mockReturnValueOnce(mockRobot);
      await getRobots(null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response and rejects it", () => {
    test("Then it should call its error method", async () => {
      Robot.find = jest.fn().mockRejectedValueOnce(new Error(""));

      await getRobots(null, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a getRobot controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method with a 200 status code", async () => {
      const req = {
        params: "" as unknown,
      };

      const expectedStatus = 200;

      Robot.findById = jest.fn().mockReturnValueOnce(mockRobot);
      await getRobot(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response and unknown id", () => {
    test("Then it should call its method status with a 404 status code", async () => {
      const req = {
        params: "" as unknown,
      };

      const expectedStatus = 404;

      Robot.findById = jest.fn().mockReturnValueOnce(mockRobot[2]);
      await getRobot(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response and it rejects it", () => {
    test("Then it should call its error method", async () => {
      const req: Partial<Request> = { params: { idRobot: "1" } };
      Robot.findById = jest.fn().mockRejectedValueOnce(new Error(""));

      await getRobot(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a deleteRobot controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with a 200", async () => {
      const expectedStatus = 200;

      const req = {
        params: "" as unknown,
        query: "" as unknown,
      };

      Robot.findById = jest.fn().mockReturnValue(mockRobot);

      Robot.findByIdAndDelete = jest.fn().mockReturnValue(mockRobot);
      await deleteRobot(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response with an invalid tokken", () => {
    test("Then it should call its status method with a 498 status", async () => {
      const expectedStatus = 498;

      const req: Partial<Request> = {
        params: { idRobot: "12345" },
        query: { token: "aaaa" },
      };

      Robot.findById = jest.fn().mockReturnValue(mockRobot);

      Robot.findByIdAndDelete = jest.fn().mockReturnValue(mockRobot);
      await deleteRobot(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response and rejects it ", () => {
    test("Then its should call its method error", async () => {
      const req = {
        params: "" as unknown,
        query: "" as unknown,
      };
      Robot.findById = jest.fn().mockRejectedValueOnce(new Error(""));

      await deleteRobot(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a createRobot controller", () => {
  describe("When it receives a response with an incorrect token", () => {
    test("Then it should call its status method with a 498", async () => {
      const expectedStatus = 498;

      const req: Partial<Request> = {
        query: { token: "benderElQueOfende" },
        body: {},
      };

      await createRobot(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
