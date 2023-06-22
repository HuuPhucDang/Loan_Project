import { Model, Document, Schema } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";

export enum ETransactionType {
  WITHDRAW = "withdraw",
  RECHARGE = "recharge",
  BONUS = "bonus",
}

export enum ETransactionStatus {
  PENDING = "pending",
  RESOLVED = "resolved",
  CANCELED = "canceled",
  DENIED = "denied",
}

export interface ITransaction {
  userId: Schema.Types.ObjectId;
  date: string;
  time: string;
  type: string;
  status: string;
  amount: number;
  balance: number;
}

export interface ITransactionDoc extends ITransaction, Document {}

export interface ITransactionModel extends Model<ITransactionDoc> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type ActionMoneyBody = {
  amount: number;
  userId: string;
};

export type RequestMoneyBody = {
  amount: number;
  withdrawPassword: string;
};
