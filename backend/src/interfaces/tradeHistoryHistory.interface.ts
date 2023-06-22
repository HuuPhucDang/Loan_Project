import { Model, Document, Schema } from "mongoose";

export enum ECoinCoupleTrade {
  BTCUSDT = "BTCUSDT",
  BNBUSDT = "BNBUSDT",
  ETHUSDT = "ETHUSDT",
  XRPUSDT = "XRPUSDT",
  ADAUSDT = "ADAUSDT",
  DOGEUSDT = "DOGEUSDT",
  SOLUSDT = "SOLUSDT",
  MATICUSDT = "MATICUSDT",
  TRXUSDT = "TRXUSDT",
  LTCUSDT = "LTCUSDT",
}

export enum ETradeResult {
  WIN = "win",
  LOSE = "lose",
  PENDING = "pending",
}

export enum ETradeType {
  BUY = "buy",
  SELL = "sell",
}

export interface ITradeHistory {
  userId: Schema.Types.ObjectId;
  result: ETradeResult;
  type: ETradeType;
  betAmount: number;
  betPrice: number;
  symbol: string;
  time: string;
  probability: number;
  betTime: string;
}

export interface ITradeHistoryDoc extends ITradeHistory, Document {}

export interface ITradeHistoryModel extends Model<ITradeHistoryDoc> {}

export type CreateNewTradeBody = {
  type: ETradeType;
  betAmount: number;
  betPrice: number;
  symbol: string;
  time: string;
  probability: number;
  index: number;
};
