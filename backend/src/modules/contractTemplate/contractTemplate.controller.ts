import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { responsePayload, pick } from "../../utils";
import * as systemInforService from "./contractTemplate.service";

export const getSystemInfor = catchAsync(
  async (_req: Request, res: Response) => {
    const infor = await systemInforService.getTemplate();
    res.send(responsePayload(true, "Get template successfully!", infor));
  }
);

export const updateTemplate = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["contractId"] === "string") {
      const user = await systemInforService.updateTemplate(
        new mongoose.Types.ObjectId(req.params["contractId"]),
        req.body
      );
      res.send(responsePayload(true, "Update template successfully!", user));
    }
  }
);

export const previewContract = catchAsync(
  async (req: Request, res: Response) => {
    const filter: any = pick(req.query, ["money", "month", "interestRate"]);
    const user = await systemInforService.previewContract(
      new mongoose.Types.ObjectId(req.user.id),
      filter
    );
    res.send(responsePayload(true, "Preview contract!", user));
  }
);
