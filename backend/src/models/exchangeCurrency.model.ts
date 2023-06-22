import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import {
  IExchageCurrencyDoc,
  IExchageCurrencyModel,
} from "../interfaces/exchangeCurrency.interface";

const exhangeCurrencySchema = new mongoose.Schema<
  IExchageCurrencyDoc,
  IExchageCurrencyModel
>(
  {
    symbol: {
      type: mongoose.Schema.Types.String,
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
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
exhangeCurrencySchema.plugin(toJSON);

exhangeCurrencySchema.static(
  "isCoinExits",
  async function (symbol: string): Promise<boolean> {
    const coin = await this.findOne({ symbol });
    return !!coin;
  }
);

const ExchangeCurrency = mongoose.model<
  IExchageCurrencyDoc,
  IExchageCurrencyModel
>("ExchangeCurrency", exhangeCurrencySchema);
export { exhangeCurrencySchema };
export default ExchangeCurrency;
