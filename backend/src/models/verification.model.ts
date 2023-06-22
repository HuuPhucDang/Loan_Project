import mongoose from "mongoose";
import paginate from "../helper/paginate/paginate";
import toJSON from "../helper/toJSON/toJSON";
import {
  IVerificationDoc,
  EVerifyType,
  IVerificationModel,
} from "../interfaces/verification.interface";

const verificationSchema = new mongoose.Schema<
  IVerificationDoc,
  IVerificationModel
>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    selfieImageUrl: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    frontImageUrl: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    backImageUrl: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    status: {
      type: mongoose.Schema.Types.String,
      enum: EVerifyType,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
verificationSchema.plugin(toJSON);
verificationSchema.plugin(paginate);

const Verification = mongoose.model<IVerificationDoc, IVerificationModel>(
  "Verification",
  verificationSchema
);
export { verificationSchema };
export default Verification;
