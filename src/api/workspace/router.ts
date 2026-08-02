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

/**
 * @openapi
 * /workspace:
 *   post:
 *     summary: Create a workspace
 *     description: Creates a workspace and adds the authenticated user as its owner and first member.
 *     operationId: createWorkspace
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 4
 *                 maxLength: 50
 *                 example: Product Engineering
 *     responses:
 *       201:
 *         description: Workspace created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Workspace created successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     workspaceId:
 *                       type: string
 *                       example: 665f1a2b3c4d5e6f7a8b9c0d
 *       400:
 *         description: Invalid workspace name.
 *       401:
 *         description: Authentication token is missing or invalid.
 */
workspaceRouter.post("/", authCheck, validate(createWorkspaceReqSchema), createWorkspaceController);

/**
 * @openapi
 * /workspace/{id}:
 *   get:
 *     summary: Get a workspace
 *     description: Returns a workspace when the authenticated user is the owner or a member.
 *     operationId: getWorkspaceById
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB workspace id.
 *         schema:
 *           type: string
 *           minLength: 24
 *         example: 665f1a2b3c4d5e6f7a8b9c0d
 *     responses:
 *       200:
 *         description: Workspace fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Workspace fetched.
 *                 data:
 *                   type: object
 *                   required:
 *                     - name
 *                     - owner
 *                     - members
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Product Engineering
 *                     owner:
 *                       type: string
 *                       example: 665f1a2b3c4d5e6f7a8b9c0d
 *                     members:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [665f1a2b3c4d5e6f7a8b9c0d]
 *       400:
 *         description: Invalid workspace id.
 *       401:
 *         description: Authentication token is missing or invalid.
 *       403:
 *         description: Authenticated user is not a workspace member.
 *       404:
 *         description: Workspace not found.
 */
workspaceRouter.get("/:id", authCheck, validate(getWorkspaceByIdReqSchema), getWorkspaceByIdController);

/**
 * @openapi
 * /workspace/{id}/invite:
 *   post:
 *     summary: Invite a member to a workspace
 *     description: Adds an existing user to a workspace. Only the workspace owner can invite members.
 *     operationId: inviteWorkspaceMember
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB workspace id.
 *         schema:
 *           type: string
 *           minLength: 24
 *         example: 665f1a2b3c4d5e6f7a8b9c0d
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 minLength: 24
 *                 description: MongoDB id of the user to add.
 *                 example: 665f1a2b3c4d5e6f7a8b9c0e
 *               message:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 100
 *                 description: Optional invitation message.
 *                 example: Welcome to the product team.
 *     responses:
 *       200:
 *         description: Invitation sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Invitation sent
 *                 data:
 *                   type: object
 *                   example: {}
 *       400:
 *         description: Invalid workspace or user id.
 *       401:
 *         description: Authentication token is missing or invalid.
 *       403:
 *         description: Only the workspace owner can invite members.
 *       404:
 *         description: Workspace or user not found.
 *       409:
 *         description: User is already a member of the workspace.
 */
workspaceRouter.post("/:id/invite", authCheck, validate(workspaceInviteReqSchema), workspaceInviteController);

export { workspaceRouter };
