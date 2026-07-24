import type { Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

const respond = <T>(
  res: Response,
  statusCode: number,
  data?: T,
  message?: string,
) => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message: message ?? getReasonPhrase(statusCode),
    data,
  });
};

export const apiResponse = {
  ok: <T>(res: Response, data: T, message?: string) =>
    respond(res, StatusCodes.OK, data, message),
  created: <T>(res: Response, data: T, message?: string) =>
    respond(res, StatusCodes.CREATED, data, message),
  updateOrDelete: <T>(res: Response, data: T, message?: string) =>
    respond(res, StatusCodes.ACCEPTED, data, message),
  noContent: <T>(res: Response) => res.status(StatusCodes.NO_CONTENT).send(),
};
