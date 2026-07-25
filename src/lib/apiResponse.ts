import type { Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

const respond = <T>(res: Response, statusCode: number, message?: string, data?: T) => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message: message ?? getReasonPhrase(statusCode),
    data,
  });
};

export const apiResponse = {
  ok: <T>(res: Response, data: T, message?: string) => respond(res, StatusCodes.OK, message, data),
  created: <T>(res: Response, data: T, message?: string) => respond(res, StatusCodes.CREATED, message, data),
  updateOrDelete: <T>(res: Response, data: T, message?: string) => respond(res, StatusCodes.ACCEPTED, message, data),
  noContent: <T>(res: Response) => res.status(StatusCodes.NO_CONTENT).send(),
};
