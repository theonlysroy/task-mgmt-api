import type { NextFunction, Request, Response } from "express";

const asyncHandler = <Req extends Request = Request>(
  fn: (req: Req, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Req, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
