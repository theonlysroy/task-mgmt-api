import { apiResponse } from "@/lib/apiResponse.js";
import asyncHandler from "@/lib/asyncHandler.js";

export const createWorkspaceController = asyncHandler(async (req, res) => {
  // call service
  // send response
  apiResponse.created(res, {}, "Workspace created successfully.");
});

export const getWorkspaceByIdController = asyncHandler(async (req, res) => {
  // call service
  apiResponse.ok(res, {}, "Workspace fetched.");
});

export const workspaceInviteController = asyncHandler(async (req, res) => {
  // call service
  apiResponse.ok(res, {}, "Invitation sent");
});
