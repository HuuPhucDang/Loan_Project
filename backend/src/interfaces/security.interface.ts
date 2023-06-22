import { Document, Schema } from "mongoose";
export interface ISecurity {
  userId: Schema.Types.ObjectId;
  phonenumber: string;
  email: string;
  withdrawPassword: string;
  isVerified: boolean;
}

export interface ISecurityDoc extends ISecurity, Document {
  isWithdrawPasswordMatch(password: string): Promise<boolean>;
}

export type UpdatePhoneNumberBody = {
  phonenumber: string;
};

export type UpdateEmailBody = {
  password: string;
  email: string;
};

export type UpdateWithdrawPasswordBody = {
  password: string;
  phonenumber: string;
  email: string;
};
