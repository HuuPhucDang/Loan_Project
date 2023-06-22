import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { responsePayload } from "../../utils";
import * as tradeService from "./trade.service";

export const createNewTrade = catchAsync(
  async (req: Request, res: Response) => {
    const transaction = await tradeService.createNewTrade(
      req.user.id,
      req.body
    );
    res.send(
      responsePayload(false, "Create new trade successfully!", transaction)
    );
  }
);

export const fetchAllTrandes = catchAsync(
  async (req: Request, res: Response) => {
    const result = await tradeService.fetchAllTrades(req.user.id);
    res.send(responsePayload(true, "Fetch all trades successfully!", result));
  }
);
