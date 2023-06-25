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
    header: {
      type: String,
      required: false,
      default: "",
    },
    nameOfContract: {
      type: String,
      required: false,
      default: "",
    },
    sideA: {
      type: String,
      required: false,
      default: "",
    },
    sideB: {
      type: String,
      required: false,
      default: "",
    },
    terms: {
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
