import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import toJSON from "../helper/toJSON/toJSON";
import paginate from "../helper/paginate/paginate";
import { roles } from "../config/roles";
import {
  IUserDoc,
  IUserModel,
  EUserStatus,
} from "../interfaces/user.interfaces";

const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    nickname: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    avatar: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "https://api.dicebear.com/6.x/micah/svg?seed=Lily",
    },
    role: {
      type: mongoose.Schema.Types.String,
      enum: roles,
      default: "user",
    },
    status: {
      type: mongoose.Schema.Types.String,
      enum: EUserStatus,
      default: "active",
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
    },
    verification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Verification",
    },
    security: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Security",
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static(
  "isUsernameTaken",
  async function (
    username: string,
    excludeUserId: mongoose.ObjectId
  ): Promise<boolean> {
    const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
    return !!user;
  }
);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method(
  "isPasswordMatch",
  async function (password: string): Promise<boolean> {
    const user = this;
    return bcrypt.compare(password, user.password);
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export default User;
