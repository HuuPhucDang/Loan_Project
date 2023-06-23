import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { pick, responsePayload } from "../../utils";
import * as requestService from "./userRequest.service";
import { IOptions } from "../../helper/paginate/paginate";

export const requestForgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const request = await requestService.requestForgotPassword(req.body);
    res.send(
      responsePayload(
        true,
        "Request forgot password successfully! Admin will contact soon!",
        request
      )
    );
  }
);

export const fetchUserRequests = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, ["name", "role"]);
    const options: IOptions = pick(req.query, [
      "sortBy",
      "limit",
      "page",
      "projectBy",
      "populate",
    ]);
    const result = await requestService.fetchAllRequests(filter, options);
    res.send(
      responsePayload(true, "Fetch all user requests successfully!", result)
    );
  }
);
