import { Model, Document } from "mongoose";
import { ECoinCoupleTrade } from "./tradeHistoryHistory.interface";

export interface ICoin {
  symbol: ECoinCoupleTrade;
  price: number;
  intervention: number;
  icon: string;
  growth: number;
}

export interface ICoinDoc extends ICoin, Document {}

export interface ICoinModel extends Model<ICoinDoc> {
  isCoinExits(symbol: string): Promise<boolean>;
}
