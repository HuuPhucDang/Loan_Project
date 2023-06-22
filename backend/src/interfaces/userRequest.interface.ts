import { Model, Document, Schema } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";

export enum ERequestType {
  FORGOT_PASSWORD = "forgot_password",
}

export interface IUserRequest {
  userId: Schema.Types.ObjectId;
  date: string;
  time: string;
  type: string;
  message: string;
  link: string;
}

export interface IUserRequestDoc extends IUserRequest, Document {}

export interface IUserRequestModel extends Model<IUserRequestDoc> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}
