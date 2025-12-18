import { model, Schema } from "mongoose";
import { ERole, IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: Object.values(ERole),
        message: "{VALUE} is not a valid role",
      },
      default: ERole.user,
    },
    isVerified: { type: Boolean, default: true },
    profileImage: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.BCRYPT_SALT));
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
});

export const User = model<IUser>("User", userSchema);
