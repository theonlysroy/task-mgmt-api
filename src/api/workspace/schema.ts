import type { ValidatedRequest } from "@/types.js";
import z from "zod";

// -------------------- create workspace
export const createWorkspaceReqSchema = z.object({
  body: z.object({
    name: z
      .string("Workspace name is required")
      .min(4, "Must be atleast 4 characters")
      .max(50, "Not more than 50 characters"),
  }),
});
export const createWorkspaceResSchema = z.object({
  workspaceId: z.string(),
});

export type CreateWorkspaceRequest = ValidatedRequest<typeof createWorkspaceReqSchema>;
export type CreateWorkspaceResponse = z.infer<typeof createWorkspaceResSchema>;

// -------------------- get workspace by id
export const getWorkspaceByIdReqSchema = z.object({
  params: z.object({
    id: z.string("Wrokspace id is required").min(24, "Must be a valid id"),
  }),
});
export const getWorkspaceByIdResSchema = z.object({
  name: z.string(),
  owner: z.string(),
  members: z.array(z.string()),
});

export type GetWorkspaceByIdRequest = ValidatedRequest<typeof getWorkspaceByIdReqSchema>;
export type GetWorkspaceByIdResponse = z.infer<typeof getWorkspaceByIdResSchema>;

// -------------------- member invite
export const workspaceInviteReqSchema = z.object({
  params: z.object({
    id: z.string("Wrokspace id is required").min(24, "Must be a valid id"),
  }),
  body: z.object({
    userId: z.string("Id is required").min(24, "Must be a valid id"),
    // custom message to sent in the email invite
    message: z.string().min(6, "Must be atleast 6 characters").max(100, "Max 100 characters allowed.").optional(),
  }),
});
export const workspaceInviteResSchema = z.object({});

export type WorkspaceInviteRequest = ValidatedRequest<typeof workspaceInviteReqSchema>;
export type WorkspaceInviteResponse = z.infer<typeof workspaceInviteResSchema>;
