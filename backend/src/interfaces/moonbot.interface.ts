import { Model, Document } from "mongoose";
import { ETradeType } from "./tradeHistoryHistory.interface";

export interface IMoonbot {
  time: number;
  limitedTime: number;
  type: ETradeType;
  probability: number;
  name: string;
}

export interface IMoonbotDoc extends IMoonbot, Document {}

export interface IMoonbotModel extends Model<IMoonbotDoc> {}

export type UpdateMoonBotBody = {
  time: number;
  limitedTime: number;
  probability: number;
};
