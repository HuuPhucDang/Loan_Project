import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { responsePayload } from "../../utils";
import * as chatBoxService from "./chatBox.service";

export const getChatBoxes = catchAsync(async (req: Request, res: Response) => {
  const chatBoxes = await chatBoxService.getChatBoxes(
    new mongoose.Types.ObjectId(req.user.id)
  );
  res.send(responsePayload(true, "Fetch chat boxes successfully!", chatBoxes));
});

export const getChatBoxById = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["roomId"] === "string") {
      const chatBox = await chatBoxService.getChatBoxById(
        new mongoose.Types.ObjectId(req.params["roomId"])
      );
      res.send(responsePayload(true, "Get chat box successfully!", chatBox));
    }
  }
);
