import type { LoginRequest } from "@/api/auth/schema.js";
import { apiResponse } from "@/lib/apiResponse.js";
import asyncHandler from "@/lib/asyncHandler.js";
import { logger } from "@/lib/logger.js";

export const loginController = asyncHandler(async (req: LoginRequest, res, next) => {
  const {} = req.body;
  logger.info("body ==>", req.body);
  apiResponse.ok(res, {});
});
