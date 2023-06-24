import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { pick, responsePayload } from "../../utils";
import fs from "fs";
import * as verificationService from "./contract.service";
import { IOptions } from "../../helper/paginate/paginate";

export const createContract = catchAsync(
  async (req: Request, res: Response) => {
    const allFiles: any = req.files;
    const updateBody: any = { ...req.body };
    Object.keys(allFiles).map((key: any) => {
      if (allFiles[key][0]?.path) {
        const img = fs.readFileSync(allFiles[key][0]?.path);
        const encode_image = img.toString("base64");
        updateBody[`${key}`] = encode_image;
      }
    });
    const user = await verificationService.createContract(
      new mongoose.Types.ObjectId(req.user.id),
      updateBody
    );
    res.send(responsePayload(true, "Create contract successfully!", user));
  }
);

export const updateContract = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["contractId"] === "string") {
      const user = await verificationService.updateContract(
        new mongoose.Types.ObjectId(req.params["contractId"]),
        req.body
      );
      res.send(responsePayload(true, "Update contract successfully!", user));
    }
  }
);

export const approvedContract = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["contractId"] === "string") {
      const user = await verificationService.approveContract(
        new mongoose.Types.ObjectId(req.params["contractId"])
      );
      res.send(responsePayload(true, "Approved Contract successfully!", user));
    }
  }
);

export const deniedContract = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["contractId"] === "string") {
      await verificationService.denyContract(
        new mongoose.Types.ObjectId(req.params["contractId"])
      );
      res.send(responsePayload(true, "Deny contract successfully!", null));
    }
  }
);

export const completeContract = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["contractId"] === "string") {
      const user = await verificationService.completeContract(
        new mongoose.Types.ObjectId(req.params["contractId"])
      );
      res.send(responsePayload(true, "Complete contract successfully!", user));
    }
  }
);

export const fetchAllContracts = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, ["name", "role"]);
    const options: IOptions = pick(req.query, [
      "sortBy",
      "limit",
      "page",
      "projectBy",
      "populate",
    ]);
    const result = await verificationService.fetchAllContracts(filter, options);
    res.send(
      responsePayload(true, "Fetch all contracts successfully!", result)
    );
  }
);
