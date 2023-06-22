import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import { IMoonbotDoc, IMoonbotModel } from "../interfaces/moonbot.interface";
import { ETradeType } from "../interfaces/tradeHistoryHistory.interface";

const moonbotSchema = new mongoose.Schema<IMoonbotDoc, IMoonbotModel>(
  {
    name: {
      type: mongoose.Schema.Types.String,
      unique: true,
      private: true,
    },
    time: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    limitedTime: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    probability: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    type: {
      type: mongoose.Schema.Types.String,
      enum: ETradeType,
      default: ETradeType.BUY,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
moonbotSchema.plugin(toJSON);

const Moonbot = mongoose.model<IMoonbotDoc, IMoonbotModel>(
  "Moonbot",
  moonbotSchema
);
export { moonbotSchema };
export default Moonbot;
