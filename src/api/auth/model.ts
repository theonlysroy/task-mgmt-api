import { model, Schema, Types } from "mongoose";

interface IRefreshToken {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  revoked: boolean;
  createdByIp?: string;
  userAgent?: string;
}

const refreshTokenSchema = new Schema<IRefreshToken>({}, { timestamps: true });

export const RefreshToken = model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema,
);
