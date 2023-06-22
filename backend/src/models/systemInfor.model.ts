import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import {
  ISystemInforDoc,
  ISystemInforModel,
} from "../interfaces/systemInfo.interface";

const systemInforSchema = new mongoose.Schema<
  ISystemInforDoc,
  ISystemInforModel
>(
  {
    QRUrl: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    fullname: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    bankName: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    accountNumber: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    message: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
systemInforSchema.plugin(toJSON);

const SystemInfor = mongoose.model<ISystemInforDoc>(
  "SystemInfor",
  systemInforSchema
);
export { systemInforSchema };
export default SystemInfor;
