import type { LoginRequest } from "@/api/auth/schema.js";
import { authService } from "@/api/auth/service.js";
import { apiResponse } from "@/lib/apiResponse.js";
import asyncHandler from "@/lib/asyncHandler.js";
import { logger } from "@/lib/logger.js";

export const loginController = asyncHandler(async (req: LoginRequest, res, next) => {
  const { email, password } = req.body;
  const data = await authService.login(email, password, req.ip, req.headers["user-agent"]);
  apiResponse.ok(res, data, "Login successful");
});
