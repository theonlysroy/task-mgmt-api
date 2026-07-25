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

// -----------------------------------------------------
