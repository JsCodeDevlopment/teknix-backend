import { NextFunction, Response, Request } from "express";
import { ApiError } from "../../usecases/errors/api.error";
import { StatusCode } from "../adapters/http/interfaces/statusCode.enum";

export function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      error: error.message,
    });
    return;
  }

  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    error: error.message,
  });
}
