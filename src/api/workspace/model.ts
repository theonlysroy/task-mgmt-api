import { addDays } from "date-fns";
import { model, Schema, type Document, type Types } from "mongoose";

interface IWorkspace extends Document {
  name?: string;
  owner: Types.ObjectId;
  members: Array<Types.ObjectId>;
}

interface IWorkspaceInvite extends Document {
  workspaceId: Types.ObjectId;
  email: string;
  invitedBy: Types.ObjectId;
  token: string;
  expiresAt: Date;
  accepted: boolean;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    members: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
  },
  { timestamps: true },
);

const workspaceInviteSchema = new Schema<IWorkspaceInvite>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    email: { type: String, required: true, trim: true },
    invitedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, default: () => addDays(new Date(), 1) },
    accepted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Workspace = model<IWorkspace>("Workspace", workspaceSchema);
export const WorkspaceInvite = model<IWorkspaceInvite>("WorkspaceInvite", workspaceInviteSchema);
