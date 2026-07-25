import { RefreshToken } from "@/api/auth/model.js";
import type { LoginResponse, RegisterRequest, RegisterResponse } from "@/api/auth/schema.js";
import { User } from "@/api/user/model.js";
import { ApiError } from "@/lib/ApiError.js";
import { AppConstants } from "@/lib/constants.js";
import { isPasswordCorrect } from "@/lib/helpers.js";
import { logger } from "@/lib/logger.js";
import { ErrorMsg } from "@/lib/messages.js";
import { generateTokens } from "@/lib/tokenGenerator.js";
import { addDays } from "date-fns";
import mongoose from "mongoose";

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

const registerService = async (args: RegisterRequest["body"]): Promise<RegisterResponse> => {
  const { email, name, password, role } = args;

  const session = await mongoose.startSession();
  const existedUser = await User.findOne({ email });
  if (existedUser) throw ApiError.badRequest("Email already registered.");

  try {
    session.startTransaction();
    const userObj = new User({
      email,
      name,
      passwordHash: password,
      role,
    });
    const user = await userObj.save({ session });

    if (!user) throw ApiError.internalError("Registration failed.");
    const userData = {
      id: user._id.toString(),
      email: user.email,
      createdAt: user.createdAt,
    };
    const { accessToken, refreshToken } = await generateTokens(userData);
    await session.commitTransaction();
    return {
      ...user,
      token: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const authService = {
  login: loginService,
  register: registerService,
};
