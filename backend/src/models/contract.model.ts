import mongoose from "mongoose";
import paginate from "../helper/paginate/paginate";
import toJSON from "../helper/toJSON/toJSON";
import {
  IContractDoc,
  EVerifyType,
  IContractModel,
} from "../interfaces/contract.interface";

const contractSchema = new mongoose.Schema<IContractDoc, IContractModel>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    content: {
      type: {
        header: {
          type: mongoose.Schema.Types.String,
          default: "",
        },
        nameOfContract: {
          type: mongoose.Schema.Types.String,
          default: "",
        },
        sideA: {
          type: mongoose.Schema.Types.String,
          default: "",
        },
        sideB: {
          type: mongoose.Schema.Types.String,
          default: "",
        },
        terms: {
          type: mongoose.Schema.Types.String,
          default: "",
        },
      },
      required: false,
    },
    signImage: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    signedDate: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    money: {
      type: mongoose.Schema.Types.Number,
      required: false,
      default: 0,
    },
    month: {
      type: mongoose.Schema.Types.Number,
      required: false,
      default: 0,
    },
    interestRate: {
      type: mongoose.Schema.Types.Number,
      required: false,
      default: 0,
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
contractSchema.plugin(toJSON);
contractSchema.plugin(paginate);

const Contract = mongoose.model<IContractDoc, IContractModel>(
  "Contract",
  contractSchema
);
export { contractSchema };
export default Contract;
