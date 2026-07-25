import { RefreshToken } from "@/api/auth/model.js";
import type { LoginResponse } from "@/api/auth/schema.js";
import { User } from "@/api/user/model.js";
import { ApiError } from "@/lib/ApiError.js";
import { config } from "@/lib/config.js";
import { AppConstants } from "@/lib/constants.js";
import { isPasswordCorrect } from "@/lib/helpers.js";
import { logger } from "@/lib/logger.js";
import { ErrorMsg } from "@/lib/messages.js";
import { generateTokens } from "@/lib/tokenGenerator.js";
import { addDays } from "date-fns";

const loginService = async (...args: any): Promise<LoginResponse> => {
  logger.info("Login data ==>", args);
  const [email, password, ip, userAgent] = args;
  const user = await User.findOne({ email }).select("-__v");

  logger.info("user", user);
  if (!user) throw ApiError.unauthorized(ErrorMsg.loginFailed);
  const isMatch = await isPasswordCorrect(password, user.passwordHash);
  if (!isMatch) throw ApiError.unauthorized(ErrorMsg.loginFailed);

  const tokens = await generateTokens(user.toObject());

  // save refresh token
  const savedToken = await RefreshToken.create({
    userId: user._id,
    tokenHash: tokens.refreshToken,
    createdByIp: ip,
    userAgent,
    expiresAt: addDays(new Date(), AppConstants.jwt.refreshExpiry),
  });
  logger.info("saved refresh token-->", savedToken);
  if (!savedToken) throw ApiError.unauthorized(ErrorMsg.loginFailed);
  return {
    token: {
      access: tokens.accessToken,
    },
    user: {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role.toString(),
    },
  };
};

export const authService = {
  login: loginService,
};
