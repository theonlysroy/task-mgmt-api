import { model, Schema } from "mongoose";

export enum UserRole {
  Admin = "admin",
  Member = "member",
}
type TUserRoles = `${UserRole}`;

interface IUser {
  email: string;
  name: string;
  passwordHash: string;
  role: TUserRoles;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Member,
    },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
