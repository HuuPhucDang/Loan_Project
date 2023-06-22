import { Model, Document, Schema } from "mongoose";

export interface IChatMessage {
  receiverId: Schema.Types.ObjectId;
  senderId: Schema.Types.ObjectId;
  message: String;
  roomId: Schema.Types.ObjectId;
}

export interface IChatMessageDoc extends IChatMessage, Document {}

export interface IChatMessageModel extends Model<IChatMessageDoc> {}
