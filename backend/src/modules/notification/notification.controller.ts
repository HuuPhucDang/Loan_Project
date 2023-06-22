import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { responsePayload } from "../../utils";
import * as requestService from "./notification.service";

export const fetchUserNotifications = catchAsync(
  async (req: Request, res: Response) => {
    const result = await requestService.fetchAlNotifications(req.user.id);
    res.send(
      responsePayload(true, "Fetch notifications successfully!", result)
    );
  }
);
