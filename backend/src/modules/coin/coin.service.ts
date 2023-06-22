import _ from "lodash";
import Coin from "../../models/coin.model";
import { ICoinDoc } from "../../interfaces/coin.interface";
import { ECoinCoupleTrade } from "../../interfaces/tradeHistoryHistory.interface";

export const fetchAllCoins = async (): Promise<ICoinDoc[]> => {
  return await Coin.find();
};

export const updateCoinPrice = async (
  symbol: ECoinCoupleTrade,
  price: number
): Promise<ICoinDoc | null> => {
  const coin = await Coin.findOne({ symbol });
  if (!coin) return null;
  coin.price = price;
  return await coin.save();
};
