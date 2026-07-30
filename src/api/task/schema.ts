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
