import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { responsePayload } from "../../utils";
import * as systemInforService from "./employee.service";

export const createEmployee = catchAsync(
  async (req: Request, res: Response) => {
    const infor = await systemInforService.createEmployee(req.body);
    res.send(responsePayload(true, "Create employee successfully!", infor));
  }
);

export const updateEmployee = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["employeeId"] === "string") {
      const user = await systemInforService.updateEmployee(
        new mongoose.Types.ObjectId(req.params["employeeId"]),
        req.body
      );
      res.send(responsePayload(true, "Update employee successfully!", user));
    }
  }
);

export const getAllEmployee = catchAsync(
  async (_req: Request, res: Response) => {
    const user = await systemInforService.getAllEmployee();
    res.send(responsePayload(true, "Get list employees successfully!", user));
  }
);

export const updateContactList = catchAsync(
  async (req: Request, res: Response) => {
    const user = await systemInforService.updateListContact(req.body);
    res.send(responsePayload(true, "Update list employee successfully!", user));
  }
);

export const getSupportEmployee = catchAsync(
  async (_req: Request, res: Response) => {
    const user = await systemInforService.getEmployeeSupport();
    res.send(responsePayload(true, "Get supporter successfully!", user));
  }
);
