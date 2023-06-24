import { Model, Document, Schema } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";

export enum EVerifyType {
  PENDING = "pending",
  APPROVED = "approved",
  ONPROCESSING = "onProcessing",
  DONE = "done",
}

export interface IContract {
  userId: Schema.Types.ObjectId;
  employeeId: Schema.Types.ObjectId;
  content: string;
  selfieImage: string;
  frontImage: string;
  backImage: string;
  signImage: string;
  signedDate: string;
  money: number;
  month: number;
  interestRate: number;
  status: string;
}

export interface IContractDoc extends IContract, Document {}

export interface IContractModel extends Model<IContractDoc> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}
