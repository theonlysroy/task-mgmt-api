import type { Request } from "express";
import type { z, ZodType } from "zod";

export type ValidatedRequest<T extends ZodType<{ params?: any; query?: any; body?: any }>> = Request<
  z.infer<T>["params"],
  any,
  z.infer<T>["body"],
  z.infer<T>["query"]
>;
