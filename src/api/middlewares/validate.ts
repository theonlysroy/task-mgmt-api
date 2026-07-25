import { ApiError } from "@/lib/ApiError.js";
import { logger } from "@/lib/logger.js";
import { ErrorMsg } from "@/lib/messages.js";
import type { NextFunction, Request, Response } from "express";
import { treeifyError, ZodObject } from "zod";

type RequestPart = "body" | "query" | "params" | "all";

export const validate = (schema: ZodObject, part: RequestPart = "all") => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reqObjectToParse =
        part === "all" ? { body: req.body, params: req.params, query: req.query } : { [part]: req[part] };
      const result = await schema.safeParseAsync(reqObjectToParse);
      if (!result.success) {
        const tree = treeifyError(result.error);
        throw ApiError.validationFailed(ErrorMsg.validationFailed, tree);
      }
      req["body"] = result.data.body;
      next();
    } catch (error) {
      next(error);
    }
  };
};
