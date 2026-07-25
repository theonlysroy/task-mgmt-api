import { model, Schema, Types } from "mongoose";

interface IRefreshToken {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  revoked: boolean;
  createdByIp?: string;
  userAgent?: string;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenHash: { type: String, required: true },
    createdByIp: { type: String },
    userAgent: { type: String },
    revoked: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

refreshTokenSchema.methods.isValid = function () {
  return new Date() < this.expiresAt;
};

export const RefreshToken = model<IRefreshToken>("RefreshToken", refreshTokenSchema);
