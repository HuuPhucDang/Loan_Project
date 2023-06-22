import { Model, Document } from "mongoose";

export interface ISystemInfor {
  QRUrl: string;
  fullname: string;
  bankName: string;
  accountNumber: string;
  message: string;
}

export interface ISystemInforDoc extends ISystemInfor, Document {}

export interface ISystemInforModel extends Model<ISystemInforDoc> {}

export type UpdateSystemInforBody = {
  QRUrl: File;
  fullname: string;
  bankName: string;
  accountNumber: string;
  message: string;
};
