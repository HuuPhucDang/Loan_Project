import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import { IEmployeeDoc, IEmployeeModel } from "../interfaces/employee.interface";

const employeeSchema = new mongoose.Schema<IEmployeeDoc, IEmployeeModel>(
  {
    fullname: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "",
    },
    contact: {
      type: mongoose.Schema.Types.String,
      unique: true,
      default: "",
    },
    isActive: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    count: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
employeeSchema.plugin(toJSON);

employeeSchema.static(
  "isContactTaken",
  async function (
    contact: string,
    excludeUserId: mongoose.ObjectId
  ): Promise<boolean> {
    const user = await this.findOne({ contact, _id: { $ne: excludeUserId } });
    return !!user;
  }
);

const Employee = mongoose.model<IEmployeeDoc, IEmployeeModel>(
  "Employee",
  employeeSchema
);
export { employeeSchema };
export default Employee;
