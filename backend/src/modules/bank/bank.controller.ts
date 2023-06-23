import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { responsePayload } from "../../utils";
import * as bankService from "./bank.service";

export const activeBank = catchAsync(async (req: Request, res: Response) => {
  const user = await bankService.activeBank(
    new mongoose.Types.ObjectId(req.user.id),
    req.body
  );
  res.send(responsePayload(true, "Active bank successfully!", user));
});

