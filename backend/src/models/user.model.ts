import mongoose from "mongoose";
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
    email: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    fullname: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    idNumber: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    dob: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    gender: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    job: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    address: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    income: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    purpose: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    relativesPhoneNumber: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    relationshipWithRelatives: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
    },
    verification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Verification",
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

userSchema.static(
  "isIdCardTaken",
  async function (
    idNumber: string,
    excludeUserId: mongoose.ObjectId
  ): Promise<boolean> {
    const user = await this.findOne({ idNumber, _id: { $ne: excludeUserId } });
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
    return password === user.password;
  }
);

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export default User;
