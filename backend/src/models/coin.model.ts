import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import { ICoinDoc, ICoinModel } from "../interfaces/coin.interface";
import { ECoinCoupleTrade } from "../interfaces/tradeHistoryHistory.interface";

const coinSchema = new mongoose.Schema<ICoinDoc, ICoinModel>(
  {
    symbol: {
      type: mongoose.Schema.Types.String,
      enum: ECoinCoupleTrade,
      unique: true,
    },
    price: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    intervention: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    icon: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    growth: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
coinSchema.plugin(toJSON);

coinSchema.static(
  "isCoinExits",
  async function (symbol: string): Promise<boolean> {
    const coin = await this.findOne({ symbol });
    return !!coin;
  }
);

const Coin = mongoose.model<ICoinDoc, ICoinModel>("Coin", coinSchema);
export { coinSchema };
export default Coin;
