import type { Request } from "express";
import type { z, ZodType } from "zod";

type InferParams<T> = z.infer<T> extends { params: infer P } ? P : {};
type InferBody<T> = z.infer<T> extends { body: infer B } ? B : {};
type InferQuery<T> = z.infer<T> extends { query: infer Q } ? Q : {};

export type ValidatedRequest<T extends ZodType> = Request<InferParams<T>, any, InferBody<T>, InferQuery<T>>;
