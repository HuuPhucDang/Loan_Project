import mongoose, { Model, Document } from "mongoose";

export interface IEmployee {
  fullname: string;
  contact: string;
  isActive: boolean;
  count: number;
}

export interface IEmployeeDoc extends IEmployee, Document {}

export interface IEmployeeModel extends Model<IEmployeeDoc> {
  isContactTaken(
    contact: string,
    excludeUserId?: mongoose.Types.ObjectId
  ): Promise<boolean>;
}
