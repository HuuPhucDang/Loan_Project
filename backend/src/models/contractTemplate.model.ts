import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import {
  IContractTemplateDoc,
  IContractTemplateModel,
} from "../interfaces/contractTemplate.interface";

const systemInforSchema = new mongoose.Schema<
  IContractTemplateDoc,
  IContractTemplateModel
>(
  {
    content: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
systemInforSchema.plugin(toJSON);

const SystemInfor = mongoose.model<IContractTemplateDoc>(
  "SystemInfor",
  systemInforSchema
);
export { systemInforSchema };
export default SystemInfor;
