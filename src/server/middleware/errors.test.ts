import type { Response } from "express";
import type CustomError from "../../CustomError/CustomError";
import { generalError, notFoundError } from "./errors";

beforeAll(() => {
  jest.clearAllMocks();
});
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};
describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method status with code 404", () => {
      const expectedStatusCode = 404;

      notFoundError(null, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with 'Endpoint not found'", () => {
      const expectedErrorResponse = {
        message: "Endpoint not found",
      };
      notFoundError(null, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedErrorResponse);
    });
  });
});

describe("Given a generalError middleware", () => {
  const error = new Error("");

  describe("When it receives a response", () => {
    test("Then it should call its method status with code 500", () => {
      const expectedStatusCode = 500;

      generalError(error as CustomError, null, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with an error with 'Something went wrong' message", () => {
      const expectedError = {
        error: "Something went wrong",
      };

      generalError(error as CustomError, null, res as Response, () => {});

      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
