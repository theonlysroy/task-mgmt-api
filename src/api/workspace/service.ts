import type {
  AcceptWorkspaceInvitationResponse,
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  GetWorkspaceByIdRequest,
  GetWorkspaceByIdResponse,
  WorkspaceInvitationTokenRequest,
  WorkspaceInviteRequest,
  WorkspaceInviteResponse,
} from "@/api/workspace/schema.js";
import { User } from "@/api/user/model.js";
import { Workspace, WorkspaceInvite } from "@/api/workspace/model.js";
import { ApiError } from "@/lib/ApiError.js";
import { config } from "@/lib/config.js";
import { emailService } from "@/lib/emailService.js";
import { randomBytes } from "node:crypto";
import { Types } from "mongoose";

const getUserId = (user?: RequestUser): string | Types.ObjectId => {
  const userId = user?._id ?? user?.id;
  if (!userId) throw ApiError.unauthorized("Please login to access this workspace");
  return userId;
};

type RequestUser = {
  _id?: Types.ObjectId | string;
  id?: Types.ObjectId | string;
};

const assertValidObjectId = (id: string, resource: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest(`${resource} id must be valid`);
  }
};

const createInvitationUrl = (token: string) =>
  `http://${config.host}:${config.port}/api/${config.apiVersion}/workspace/invitation/${token}/accept`;

export const createWorkspaceService = async (
  args: CreateWorkspaceRequest["body"],
  user?: RequestUser,
): Promise<CreateWorkspaceResponse> => {
  const ownerId = getUserId(user);
  const workspace = await Workspace.create({
    name: args.name,
    owner: ownerId,
    members: [ownerId],
  });

  if (!workspace) throw ApiError.internalError("Workspace creation failed.");

  return {
    workspaceId: workspace._id.toString(),
  };
};

export const getWorkspaceByIdService = async (
  args: GetWorkspaceByIdRequest["params"],
  user?: RequestUser,
): Promise<GetWorkspaceByIdResponse> => {
  const userId = getUserId(user);
  assertValidObjectId(args.id, "Workspace");

  const workspace = await Workspace.findById(args.id).select("-__v").lean();
  if (!workspace) throw ApiError.notFound("Workspace not found");

  const members = workspace.members ?? [];
  const isMember =
    workspace.owner.toString() === userId.toString() ||
    members.some((member) => member.toString() === userId.toString());
  if (!isMember) throw ApiError.forbidden("You do not have access to this workspace");

  return {
    name: workspace.name ?? "",
    owner: workspace.owner.toString(),
    members: members.map((member) => member.toString()),
  };
};

export const workspaceInviteService = async (
  args: WorkspaceInviteRequest["params"] & WorkspaceInviteRequest["body"],
  user?: RequestUser,
): Promise<WorkspaceInviteResponse> => {
  const requesterId = getUserId(user);
  assertValidObjectId(args.id, "Workspace");
  assertValidObjectId(args.userId, "User");

  const workspace = await Workspace.findById(args.id);
  if (!workspace) throw ApiError.notFound("Workspace not found");

  if (workspace.owner.toString() !== requesterId.toString()) {
    throw ApiError.forbidden("Only the workspace owner can invite members");
  }

  const invitee = await User.findById(args.userId);
  if (!invitee) throw ApiError.notFound("User not found");

  const inviteeId = invitee._id.toString();
  const members = workspace.members ?? [];
  const alreadyMember =
    workspace.owner.toString() === inviteeId || members.some((member) => member.toString() === inviteeId);
  if (alreadyMember) throw ApiError.conflict("User is already a member of this workspace");

  const invitation = await WorkspaceInvite.create({
    workspaceId: workspace._id,
    email: invitee.email,
    invitedBy: requesterId,
    token: randomBytes(32).toString("hex"),
  });

  await emailService.sendWorkspaceInviteEmail(
    { name: invitee.name, email: invitee.email },
    workspace.name ?? "TaskFlow workspace",
    args.message ?? "",
    createInvitationUrl(invitation.token),
  );

  return {};
};

export const acceptWorkspaceInvitationService = async (
  args: WorkspaceInvitationTokenRequest["params"],
): Promise<AcceptWorkspaceInvitationResponse> => {
  const invitation = await WorkspaceInvite.findOne({ token: args.token });
  if (!invitation) throw ApiError.notFound("Invitation not found");
  if (invitation.accepted) throw ApiError.conflict("Invitation has already been accepted");
  if (invitation.expiresAt.getTime() <= Date.now()) throw ApiError.badRequest("Invitation has expired");

  const invitee = await User.findOne({ email: invitation.email });
  if (!invitee) throw ApiError.notFound("Invited user not found");

  const workspace = await Workspace.findById(invitation.workspaceId);
  if (!workspace) throw ApiError.notFound("Workspace not found");

  const updatedWorkspace = await Workspace.findOneAndUpdate(
    { _id: workspace._id },
    { $addToSet: { members: invitee._id } },
    { returnDocument: "after" },
  );
  if (!updatedWorkspace) throw ApiError.internalError("Workspace update failed");

  const acceptedInvitation = await WorkspaceInvite.findOneAndUpdate(
    { _id: invitation._id, accepted: false },
    { $set: { accepted: true } },
    { returnDocument: "after" },
  );
  if (!acceptedInvitation) throw ApiError.conflict("Invitation has already been accepted");

  return {
    workspaceId: workspace._id.toString(),
    accepted: true,
  };
};

export const workspaceService = {
  createWorkspaceService,
  getWorkspaceByIdService,
  workspaceInviteService,
  acceptWorkspaceInvitationService,
};
