import { ApiError } from "@/lib/ApiError.js";
import { config } from "@/lib/config.js";
import { logger } from "@/lib/logger.js";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt, { type SignOptions } from "jsonwebtoken";

export const generateTokens = async (payload: any) => {
  try {
    const accessToken = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.accessExpiry } as SignOptions);
    const refreshToken = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.refreshExpiry } as SignOptions);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    return { accessToken, refreshToken: refreshTokenHash };
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "", error);
  }
};
