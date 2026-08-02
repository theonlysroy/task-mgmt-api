import type {
  CreateWorkspaceRequest,
  GetWorkspaceByIdRequest,
  WorkspaceInviteRequest,
} from "@/api/workspace/schema.js";
import { workspaceService } from "@/api/workspace/service.js";
import { apiResponse } from "@/lib/apiResponse.js";
import asyncHandler from "@/lib/asyncHandler.js";

export const createWorkspaceController = asyncHandler(async (req: CreateWorkspaceRequest, res) => {
  const data = await workspaceService.createWorkspaceService(req.body, req.user);
  apiResponse.created(res, data, "Workspace created successfully.");
});

export const getWorkspaceByIdController = asyncHandler(async (req: GetWorkspaceByIdRequest, res) => {
  const data = await workspaceService.getWorkspaceByIdService(req.params, req.user);
  apiResponse.ok(res, data, "Workspace fetched.");
});

export const workspaceInviteController = asyncHandler(async (req: WorkspaceInviteRequest, res) => {
  const data = await workspaceService.workspaceInviteService({ ...req.params, ...req.body }, req.user);
  apiResponse.ok(res, data, "Invitation sent");
});
