import { Model, Document, Schema } from "mongoose";

export enum EUserType {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCE = "advance",
  PROFESSINAL = "professional",
}

export enum ELimitTradeTime {
  BEGINNER = 30,
  INTERMEDIATE = 60,
  ADVANCE = 120,
  PROFESSINAL = 150,
}

export interface IUserType {
  userId: Schema.Types.ObjectId;
  name: string;
  type: EUserType;
}

export interface IUserTypeDoc extends IUserType, Document {}

export interface IUserTypeModel extends Model<IUserTypeDoc> {}
