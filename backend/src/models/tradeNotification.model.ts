import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import {
  ITradeNotificationDoc,
  ITradeNotificationModel,
} from "../interfaces/tradeNotification.interface";

const tradeNotificationSchema = new mongoose.Schema<
  ITradeNotificationDoc,
  ITradeNotificationModel
>(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    message: {
      type: mongoose.Schema.Types.String,
    },
    time: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tradeNotificationSchema.plugin(toJSON);

const TradeNotification = mongoose.model<
  ITradeNotificationDoc,
  ITradeNotificationModel
>("TradeNotification", tradeNotificationSchema);
export { tradeNotificationSchema };
export default TradeNotification;
