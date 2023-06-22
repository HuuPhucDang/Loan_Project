import { Model, Document } from "mongoose";

export interface IExchageCurrency {
  symbol: string;
  price: number;
  intervention: number;
}

export interface IExchageCurrencyDoc extends IExchageCurrency, Document {}

export interface IExchageCurrencyModel extends Model<IExchageCurrencyDoc> {
  isCoinExits(symbol: string): Promise<boolean>;
}
