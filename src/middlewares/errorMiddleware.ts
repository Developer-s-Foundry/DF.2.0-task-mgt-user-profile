import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import APP_CONFIGS from "../common/config";

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
  if (APP_CONFIGS.NODE_ENV === "production") {
    return res.status(statusCode).json({
      status: status,
      message:
        err instanceof AppError && err.isOperational
          ? err.message
          : "Something went very wrong!",
    });
  }
  if (APP_CONFIGS.NODE_ENV === "development") {
    return res.status(statusCode).json({
      status: status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
  next(err);
};
