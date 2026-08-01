import type { ValidatedRequest } from "@/types.js";
import z from "zod";

export const taskReqSchema = z.object({
  body: z.object({
    title: z.string("Required, must be within 4-30 characters").min(4, "").max(30, ""),
    description: z.string("Required, must be within 4-100 characters").min(4, "").max(100, ""),
    assignedTo: z.string().optional(),
  }),
});
export const taskResSchema = z.object({
  taskId: z.string("Required"),
});
export type TaskRequest = ValidatedRequest<typeof taskReqSchema>;
export type TaskResponse = z.infer<typeof taskResSchema>;

// --------- req by id
export const taskReqByIdSchema = z.object({
  params: z.object({
    id: z.string("Task id is a required param").min(24, "Must be a valid id"),
  }),
});
export const taskResByIdSchema = z.object({
  title: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
});
export type TaskByIdRequest = ValidatedRequest<typeof taskReqByIdSchema>;
export type TaskByIdResponse = z.infer<typeof taskResByIdSchema>;
