import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import paginate from "../helper/paginate/paginate";
import { IWalletDoc, IWalletModel } from "../interfaces/waller.interface";

const walletSchema = new mongoose.Schema<IWalletDoc, IWalletModel>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    balance: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    benefit: {
      type: mongoose.Schema.Types.Number,
      default: 0.1,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
walletSchema.plugin(toJSON);
walletSchema.plugin(paginate);

// walletSchema.pre("save", async function (next) {
//   // const wallet = this;
//   // bank.isVerified = Boolean(
//   //   bank.accountNumber && bank.bankAddress && bank.bankName && bank.fullname
//   // );
//   next();
// });

const Wallet = mongoose.model<IWalletDoc, IWalletModel>("Wallet", walletSchema);

export { walletSchema };
export default Wallet;
