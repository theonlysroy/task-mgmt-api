import { model, Schema, type Document, type Types } from "mongoose";

interface IWorkspace extends Document {
  name?: string;
  owner: Types.ObjectId;
  members: Array<Types.ObjectId>;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    members: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
  },
  { timestamps: true },
);

export const Workspace = model<IWorkspace>("Workspace", workspaceSchema);
