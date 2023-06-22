import mongoose from "mongoose";
// import moment from "moment";
import paginate from "../helper/paginate/paginate";
import toJSON from "../helper/toJSON/toJSON";
import {
  ITransactionDoc,
  ETransactionType,
  ITransactionModel,
  ETransactionStatus,
} from "../interfaces/transaction.interface";

const transactionSchema = new mongoose.Schema<
  ITransactionDoc,
  ITransactionModel
>(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    date: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    time: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    balance: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    amount: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    type: {
      type: mongoose.Schema.Types.String,
      enum: ETransactionType,
    },
    status: {
      type: mongoose.Schema.Types.String,
      enum: ETransactionStatus,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);

const Transaction = mongoose.model<ITransactionDoc, ITransactionModel>(
  "Transaction",
  transactionSchema
);
export { transactionSchema };
export default Transaction;
