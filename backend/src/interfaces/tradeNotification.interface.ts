import { Model, Document, Schema } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";

export interface ITradeNotification {
  userId: Schema.Types.ObjectId;
  message: string;
  time: string;
}

export interface ITradeNotificationDoc extends ITradeNotification, Document {}

export interface ITradeNotificationModel extends Model<ITradeNotification> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}
