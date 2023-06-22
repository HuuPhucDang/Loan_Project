import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { responsePayload } from "../../utils";
import * as securityService from "./security.service";

export const verifyPhonenumber = catchAsync(
  async (req: Request, res: Response) => {
    const user = await securityService.verifyPhonenumber(
      new mongoose.Types.ObjectId(req.user.id),
      req.body
    );
    res.send(responsePayload(true, "Active phonenumber successfully!", user));
  }
);

export const activeUserEmail = catchAsync(
  async (req: Request, res: Response) => {
    const user = await securityService.activeUserEmail(
      new mongoose.Types.ObjectId(req.user.id),
      req.body
    );
    res.send(responsePayload(true, "Active email successfully!", user));
  }
);

export const changeUserEmail = catchAsync(
  async (req: Request, res: Response) => {
    const user = await securityService.changeUserEmail(
      new mongoose.Types.ObjectId(req.user.id),
      req.body
    );
    res.send(responsePayload(true, "Change email successfully!", user));
  }
);

export const activeWithdrawPassword = catchAsync(
  async (req: Request, res: Response) => {
    const user = await securityService.activeWithdrawPassword(
      new mongoose.Types.ObjectId(req.user.id),
      req.body
    );
    res.send(
      responsePayload(true, "Active Withdraw password successfully!", user)
    );
  }
);

export const changeWithdrawPassword = catchAsync(
  async (req: Request, res: Response) => {
    const user = await securityService.changeWithdrawPassword(
      new mongoose.Types.ObjectId(req.user.id),
      req.body
    );
    res.send(
      responsePayload(true, "Change Withdraw password successfully!", user)
    );
  }
);

export const changeUserPassword = catchAsync(
  async (req: Request, res: Response) => {
    const user = await securityService.changeUserPassword(
      new mongoose.Types.ObjectId(req.user.id),
      req.body
    );
    res.send(responsePayload(true, "Change password successfully!", user));
  }
);

