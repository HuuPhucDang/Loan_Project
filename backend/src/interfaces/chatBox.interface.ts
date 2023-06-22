import { Model, Document, Schema } from "mongoose";

export enum EChatBox {
  READED = "readed",
  UNREAD = "unread",
}

export interface IChatBox {
  receiverId: Schema.Types.ObjectId;
  senderId: Schema.Types.ObjectId;
  status: EChatBox;
  messages: Schema.Types.ObjectId[];
}

export interface IChatBoxDoc extends IChatBox, Document {}

export interface IChatBoxModel extends Model<IChatBoxDoc> {}

export type CreateMessageBody = {
  receiverId: string;
  roomId: string;
  message: string;
};
