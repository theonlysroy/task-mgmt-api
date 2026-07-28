import { UserRole } from "@/api/user/model.js";
import { AppConstants } from "@/lib/constants.js";
import { ValidationMsg } from "@/lib/messages.js";
import type { ValidatedRequest } from "@/types.js";
import z from "zod";

// -------------------------------- login
export const loginReqSchema = z.object({
  body: z.object({
    email: z.email().nonempty(ValidationMsg.email.required),
    password: z
      .string(ValidationMsg.password.required)
      .min(AppConstants.password.minLength, ValidationMsg.password.minLength),
  }),
});

export const loginResSchema = z.object({
  token: z.object({
    access: z.string().min(32),
  }),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    createdAt: z.string().optional(),
    role: z.string(),
  }),
});
export type LoginRequest = ValidatedRequest<typeof loginReqSchema>;
export type LoginResponse = z.infer<typeof loginResSchema>;

// ----------------------------------- register
export const registerReqSchema = z.object({
  body: z.object({
    email: z.email(),
    name: z.string().min(4, "Name should be at least 4 characters long."),
    password: z
      .string()
      .regex(
        AppConstants.password.regex,
        "Password must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 digit and 1 special character",
      ),
    role: z.enum(Object.values(UserRole)),
  }),
});

export const registerResSchema = z.object({
  id: z.string(),
  createdAt: z.date().optional(),
  token: z.object({
    accessToken: z.string(),
    refreshToken: z.string().optional(),
  }),
});
export type RegisterRequest = ValidatedRequest<typeof registerReqSchema>;
export type RegisterResponse = z.infer<typeof registerResSchema>;

export const refreshTokenSchema = z.object({
  body: z.object({
    token: z.string("Token is required").regex(AppConstants.jwt.regex, "Invalid JWT token"),
  }),
});
export const refreshTokenResSchema = z.object({
  token: z.object({
    accessToken: z.string(),
    refreshToken: z.string().optional(),
  }),
});
export type RefreshTokenRequest = ValidatedRequest<typeof refreshTokenSchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResSchema>;
