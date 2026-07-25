import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";

export const UserRole = {
  Admin: "admin",
  Member: "member",
} as const;

type TUserRoles = (typeof UserRole)[keyof typeof UserRole];

interface IUser extends Document {
  email: string;
  name: string;
  passwordHash: string;
  role: TUserRoles;
  createdAt: Date;
  updatedAt: Date;
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
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Member,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next;
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next;
});

// userSchema.set("toObject", {
//   depopulate: true,
//   versionKey: false,
//   transform: (_, ret) => {
//     const {_id, __v, passwordHash, ...rest} = ret
//     return {
//       id: _id.toString(),
//       ...rest
//     }
//   },
// });

// userSchema.set("toJSON", {
//   depopulate: true,
//   versionKey: false,
//   transform: (_, ret) => {
//     const {_id, __v, passwordHash, ...rest} = ret
//     return {
//       id: _id.toString(),
//       ...rest
//     }
//   },
// });

export const User = model("User", userSchema);
