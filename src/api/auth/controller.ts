import type { LoginRequest, RegisterRequest } from "@/api/auth/schema.js";
import { authService } from "@/api/auth/service.js";
import { apiResponse } from "@/lib/apiResponse.js";
import asyncHandler from "@/lib/asyncHandler.js";

export const loginController = asyncHandler(async (req: LoginRequest, res) => {
  const { email, password } = req.body;
  const data = await authService.login(email, password, req.ip, req.headers["user-agent"]);
  apiResponse.ok(res, data, "Login successful");
});

export const registerController = asyncHandler(async (req: RegisterRequest, res) => {
  const data = await authService.register(req.body);
  apiResponse.created(res, data, "Register successful");
});

export const refreshTokenController = asyncHandler(async (req, res) => {
  const data = await authService.refreshToken(req.body);
  apiResponse.ok(res, data, "Refresh token successfully created.");
});
