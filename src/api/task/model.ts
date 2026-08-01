import { model, Schema, Types } from "mongoose";

interface ITask extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
  isCompleted: boolean;
  assignedTo?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

export const Task = model<ITask>("Task", taskSchema);
