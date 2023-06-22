import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import paginate from "../helper/paginate/paginate";
import { IBankDoc, IBankModel } from "../interfaces/bank.interface";

const bankSchema = new mongoose.Schema<IBankDoc, IBankModel>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    bankAddress: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    accountNumber: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
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
bankSchema.plugin(toJSON);
bankSchema.plugin(paginate);

bankSchema.pre("save", async function (next) {
  const bank = this;
  bank.isVerified = Boolean(
    bank.accountNumber && bank.bankAddress && bank.bankName && bank.fullname
  );
  next();
});

const Bank = mongoose.model<IBankDoc, IBankModel>("Bank", bankSchema);

export { bankSchema };
export default Bank;
