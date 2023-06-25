import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { pick, responsePayload } from "../../utils";
import fs from "fs";
import * as verificationService from "./verification.service";
import { IOptions } from "../../helper/paginate/paginate";
import { EVerifyType } from "../../interfaces/verification.interface";

export const uploadIDCards = catchAsync(async (req: Request, res: Response) => {
  const allFiles: any = req.files;
  const updateBody: any = {};
  Object.keys(allFiles).map((key: any) => {
    if (allFiles[key][0]?.path) {
      const img = fs.readFileSync(allFiles[key][0]?.path);
      const encode_image = img.toString("base64");
      updateBody[`${key}Url`] = encode_image;
    }
  });
  const user = await verificationService.uploadIdCards(
    new mongoose.Types.ObjectId(req.user.id),
    updateBody
  );
  res.send(responsePayload(true, "Updload ID cards successfully!", user));
});

export const approvedIDCards = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["userId"] === "string") {
      const user = await verificationService.changeIDCardStatus(
        new mongoose.Types.ObjectId(req.params["userId"]),
        EVerifyType.APPROVED
      );
      res.send(responsePayload(true, "Approved ID Card successfully!", user));
    }
  }
);

export const deniedIDCards = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["userId"] === "string") {
    const user = await verificationService.changeIDCardStatus(
      new mongoose.Types.ObjectId(req.params["userId"]),
      EVerifyType.DENY
    );
    res.send(responsePayload(true, "Denied ID Card successfully!", user));
  }
});

export const fetchAllVerifications = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, ["name", "role"]);
    const options: IOptions = pick(req.query, [
      "sortBy",
      "limit",
      "page",
      "projectBy",
      "populate",
    ]);
    const result = await verificationService.fetchAllIDCards(filter, options);
    res.send(
      responsePayload(true, "Fetch all verifications successfully!", result)
    );
  }
);
