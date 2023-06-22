import { Model, Document, Schema } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";

export interface INotification {
  userId: Schema.Types.ObjectId;
  message: string;
}

export interface INotificationDoc extends INotification, Document {}

export interface INotificationModel extends Model<INotificationDoc> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}
