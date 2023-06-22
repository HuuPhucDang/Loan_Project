import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import {
  ITradeHistoryDoc,
  ECoinCoupleTrade,
  ITradeHistoryModel,
  ETradeResult,
  ETradeType,
} from "../interfaces/tradeHistoryHistory.interface";

const tradeHistorySchema = new mongoose.Schema<
  ITradeHistoryDoc,
  ITradeHistoryModel
>(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    time: {
      type: mongoose.Schema.Types.String,
      default: "30s",
    },
    betAmount: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    betPrice: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    symbol: {
      type: mongoose.Schema.Types.String,
      enum: ECoinCoupleTrade,
    },
    result: {
      type: mongoose.Schema.Types.String,
      enum: ETradeResult,
      default: ETradeResult.PENDING,
    },
    type: {
      type: mongoose.Schema.Types.String,
      enum: ETradeType,
    },
    probability: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    betTime: {
      type: mongoose.Schema.Types.String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tradeHistorySchema.plugin(toJSON);

const TradeHistory = mongoose.model<ITradeHistoryDoc>(
  "TradeHistory",
  tradeHistorySchema
);
export { tradeHistorySchema };
export default TradeHistory;
