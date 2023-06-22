import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import fs from "fs";
import { responsePayload } from "../../utils";
import * as systemInforService from "./systemInfor.service";

export const getSystemInfor = catchAsync(
  async (_req: Request, res: Response) => {
    const infor = await systemInforService.getSystemInfor();
    res.send(responsePayload(true, "Get system infor successfully!", infor));
  }
);

export const updateSystemInfor = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["inforId"] === "string") {
      const allFiles: any = req.file;
      const img = fs.readFileSync(allFiles?.path);
      const encode_image = img.toString("base64");
      const updateBody: any = {
        QRUrl: encode_image,
      };
      const user = await systemInforService.updateSystemInfo(
        new mongoose.Types.ObjectId(req.params["inforId"]),
        { ...req.body, ...updateBody }
      );
      res.send(
        responsePayload(true, "Update system infor successfully!", user)
      );
    }
  }
);
