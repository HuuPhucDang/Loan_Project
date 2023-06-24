import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import ApiError from "../../helper/errors/ApiError";
import { IEmployeeDoc } from "../../interfaces/employee.interface";
import Employeee from "../../models/employee.model";

export const getAllEmployee = async (): Promise<IEmployeeDoc[]> => {
  const findAll = await Employeee.find();
  return findAll;
};

export const createEmployee = async (updateBody: {
  fullname: string;
  contact: string;
}): Promise<IEmployeeDoc | null> => {
  if (await Employeee.isContactTaken(updateBody.contact))
    throw new ApiError(httpStatus.NOT_FOUND, "Link FB has been taken!");
  return await Employeee.create(updateBody);
};

export const updateEmployee = async (
  id: mongoose.Types.ObjectId,
  updateBody: {
    fullname: string;
    contact: string;
  }
): Promise<IEmployeeDoc | null> => {
  const employee = await Employeee.findById(id);
  if (!employee)
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found!");
  if (
    updateBody.contact !== employee.contact &&
    (await Employeee.isContactTaken(updateBody.contact, employee.id))
  )
    throw new ApiError(httpStatus.NOT_FOUND, "Link FB has been taken!");
  Object.assign(employee, updateBody);
  return await employee.save();
};

export const updateListContact = async (updateBody: {
  ids: string[];
}): Promise<IEmployeeDoc[] | null> => {
  const employees = await Employeee.find();
  for (const employee of employees) {
    employee.isActive = _.includes(updateBody.ids, employee.id);
    employee.count = 0;
    await employee.save();
  }
  return await Employeee.find();
};

export const getEmployeeSupport = async (): Promise<IEmployeeDoc | null> => {
  const employees = await Employeee.find({ isActive: true })
    .sort({ count: 1 })
    .limit(1);
  if (!employees[0])
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No Employee avaiable for support!"
    );
  employees[0].count = employees[0].count + 1;
  return await employees[0].save();
};
