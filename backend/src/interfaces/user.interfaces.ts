import mongoose, { Model, Document, Schema } from "mongoose";
import { QueryResult } from "../helper/paginate/paginate";
import { AccessAndRefreshTokens } from "./token.interfaces";

export enum EUserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum EPaymentStatus {
  NONE = "none",
  ONPROCESSING = "onprocessing",
  DONE = "done",
}
export interface IUser {
  username: string;
  nickname: string;
  password: string;
  avatar: string;
  role: string;
  status: string;
  paymentStatus: string;
  // infor
  email: string;
  fullname: string;
  idNumber: string;
  dob: string;
  gender: string;
  job: string;
  income: number;
  purpose: string;
  address: string;
  relativesPhoneNumber: string;
  relationshipWithRelatives: string;

  wallet: Schema.Types.ObjectId;
  bank: Schema.Types.ObjectId;
  verification: Schema.Types.ObjectId;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isUsernameTaken(
    username: string,
    excludeUserId?: mongoose.Types.ObjectId
  ): Promise<boolean>;
  isIdCardTaken(
    idNumber: string,
    excludeUserId?: mongoose.Types.ObjectId
  ): Promise<boolean>;
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<IUser>;

export type UpdateUserAvatarBody = {
  avatar: string;
};

export type UpdateUserNicknameBody = {
  nickname: string;
};

export type ActiveUserPhonenumberBody = {
  phonenumber: string;
};

export type ActiveUserEmailBody = {
  email: string;
};

export type ChangeUserEmailBody = {
  password: string;
  email: string;
  newEmail: string;
};

export type ActiveWithdrawPasswordBody = {
  password: string;
  withdrawPassword: string;
};

export type ChangeWithdrawPasswordBody = {
  password: string;
  phonenumber: string;
  email: string;
  newWithdrawPassword: string;
};

export type ChangeUserPasswordPasswordBody = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type NewRegisteredUser = Omit<
  IUser,
  "role" | "onwCode" | "avatar" | "status" | "nickname"
> & { confirmPassword: string };

export type NewCreatedUser = Omit<
  IUser,
  "inviteCode" | "avatar" | "status" | "nickname"
>;

export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessAndRefreshTokens;
}

export type ActiveBankBody = {
  fullname: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
};

export type UploadIDCards = {
  frontImageUrl: string;
  backImageUrl: string;
};

export type ForgotPassword = {
  username: string;
  message: string;
};
