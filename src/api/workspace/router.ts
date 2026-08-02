import { authCheck } from "@/api/middlewares/auth.js";
import { validate } from "@/api/middlewares/validate.js";
import {
  createWorkspaceController,
  getWorkspaceByIdController,
  workspaceInviteController,
} from "@/api/workspace/controller.js";
import {
  createWorkspaceReqSchema,
  getWorkspaceByIdReqSchema,
  workspaceInviteReqSchema,
} from "@/api/workspace/schema.js";
import { Router } from "express";

const workspaceRouter = Router();

// Create workspace
workspaceRouter.post("/", authCheck, validate(createWorkspaceReqSchema), createWorkspaceController);

// Get workspace by id
workspaceRouter.get(":id", authCheck, validate(getWorkspaceByIdReqSchema), getWorkspaceByIdController);

// Add other users to the workspace via email invite
workspaceRouter.post(":id/invite", authCheck, validate(workspaceInviteReqSchema), workspaceInviteController);
