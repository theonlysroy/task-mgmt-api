import { ErrorMsg } from "@/lib/messages.js";
import rateLimit, { MINUTE } from "express-rate-limit";

export const globalRateLimiter = rateLimit({
  windowMs: 15 * MINUTE,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: ErrorMsg.globalRateLimit,
});
