import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  success: boolean;
  constructor(
    public statusCode: number,
    message: string,
    public errors?: unknown,
    public isOperational = true,
    public showStack = true,
  ) {
    super(message);
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest = (msg = "Bad Request", errors?: unknown) => new ApiError(StatusCodes.BAD_REQUEST, msg, errors);
  static validationFailed = (msg = "Validation Failed", details?: unknown) =>
    new ApiError(StatusCodes.BAD_REQUEST, msg, details);
  static unauthorized = (msg = "Unauthorized") => new ApiError(StatusCodes.UNAUTHORIZED, msg);
  static forbidden = (msg = "Forbidden") => new ApiError(StatusCodes.FORBIDDEN, msg);
  static notFound = (msg = "Not Found") => new ApiError(StatusCodes.NOT_FOUND, msg, [], false, false);
  static conflict = (msg = "Conflict", errors?: unknown) => new ApiError(StatusCodes.CONFLICT, msg, errors);
  static internalError = (msg = "Internal Error", errors?: unknown) =>
    new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, msg, errors);
}

export class ValidationError extends ApiError {
  constructor(message = "Validation Failed", details?: unknown) {
    super(StatusCodes.BAD_REQUEST, message, details);
  }
}
