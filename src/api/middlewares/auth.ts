import type { TUserToken } from "@/api/auth/types.js";
import { User } from "@/api/user/model.js";
import { ApiError } from "@/lib/ApiError.js";
import asyncHandler from "@/lib/asyncHandler.js";
import { config } from "@/lib/config.js";
import { logger } from "@/lib/logger.js";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface IExtendedJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}
export const authCheck = asyncHandler(async (req, res, next): Promise<void> => {
  const token = req.headers["authorization"]?.replace("Bearer ", "") || req.cookies?.accessToken;
  if (!token) throw ApiError.unauthorized("Token not found");

  const decoded = jwt.verify(token, config.jwt.secret) as IExtendedJwtPayload;
  logger.info("decoded payload =>", decoded);
  const user = await User.findById(decoded?.id);
  if (!user) throw ApiError.unauthorized();

  req.user = user;
  next();
});
