import { ApiError } from "@/lib/ApiError.js";
import { config } from "@/lib/config.js";
import { logger } from "@/lib/logger.js";
import type { NextFunction, Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Error as MongooseError } from "mongoose";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // early return if headers are already send, then error thrown in case of any streaming
  if (res.headersSent) return next(err);

  // [NOTE] add zod errors handler from validation logic layer
  let apiError = null;
  if (err instanceof ApiError) {
    apiError = err;
  } else if (err instanceof MongooseError) {
    const mongoErroMsg = "Database Operations failed";
    apiError = new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      mongoErroMsg,
      undefined,
      false,
    );
  } else {
    apiError = new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      err.message || getReasonPhrase(500),
      undefined,
      false,
    );
  }

  if (!apiError.isOperational) {
    logger.error("Api not operational for unexptected error", req.path);
  }

  res.status(apiError.statusCode).json({
    success: apiError.success,
    statusCode: apiError.statusCode,
    message: apiError.message,
    ...(apiError.errors ? { errors: apiError.errors } : { errors: [] }),
    ...(config.nodeEnv === "development" && { stack: apiError.stack }),
  });
};
