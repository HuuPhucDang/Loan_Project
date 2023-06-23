import { Model, Document } from "mongoose";

export interface IEmployee {
  fullname: string;
  contact: string;
  isPrimary: boolean;
  count: number;
}

export interface IEmployeeDoc extends IEmployee, Document {}

export interface IEmployeeModel extends Model<IEmployeeDoc> {}
