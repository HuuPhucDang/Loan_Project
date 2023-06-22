import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import toJSON from "../helper/toJSON/toJSON";
import { ISecurityDoc } from "../interfaces/security.interface";

const securitySchema = new mongoose.Schema<ISecurityDoc>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phonenumber: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    withdrawPassword: {
      type: mongoose.Schema.Types.String,
      required: false,
      private: true, // used by the toJSON plugin
    },
    isVerified: {
      type: mongoose.Schema.Types.Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
securitySchema.plugin(toJSON);

// .replace(/\d{4}$/, "****")
securitySchema.method(
  "isWithdrawPasswordMatch",
  async function (password: string): Promise<boolean> {
    const security = this;
    return bcrypt.compare(password, security.withdrawPassword);
  }
);

securitySchema.pre("save", async function (next) {
  const security = this;
  security.isVerified = Boolean(
    security.withdrawPassword && security.phonenumber && security.email
  );
  next();
});

const Security = mongoose.model<ISecurityDoc>("Security", securitySchema);

export { securitySchema };
export default Security;
