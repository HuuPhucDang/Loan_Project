import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { pick, responsePayload } from "../../utils";
import * as transactionService from "./transaction.service";
import { IOptions } from "../../helper/paginate/paginate";

export const rechangeMoney = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["transactionId"] === "string") {
    const user = await transactionService.rechangeMoney(
      new mongoose.Types.ObjectId(req.params["transactionId"]),
      req.body
    );
    res.send(responsePayload(true, "Rechange successfully!", user));
  }
});

export const withdrawMoney = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["transactionId"] === "string") {
    const user = await transactionService.withdrawMoney(
      new mongoose.Types.ObjectId(req.params["transactionId"]),
      req.body
    );
    res.send(responsePayload(true, "Withdraw money successfully!", user));
  }
});

export const requestWithdrawMoney = catchAsync(
  async (req: Request, res: Response) => {
    const transaction = await transactionService.requestWithdrawMoney(
      req.user.id,
      req.body
    );
    res.send(
      responsePayload(true, "Request withdraw money successfully!", transaction)
    );
  }
);

export const requestRechangeMoney = catchAsync(
  async (req: Request, res: Response) => {
    const transaction = await transactionService.requestRechargeMoney(
      req.user.id,
      req.body
    );
    res.send(
      responsePayload(true, "Request recharge money successfully!", transaction)
    );
  }
);

export const cancelTransaction = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["transactionId"] === "string") {
      const transaction = await transactionService.cancelTransaction(
        req.user.id,
        new mongoose.Types.ObjectId(req.params["transactionId"])
      );
      res.send(
        responsePayload(true, "Cancel transaction successfully!", transaction)
      );
    }
  }
);

export const denyTransaction = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["transactionId"] === "string") {
      const transaction = await transactionService.denyTransaction(
        new mongoose.Types.ObjectId(req.params["transactionId"])
      );
      res.send(
        responsePayload(true, "Deny transaction successfully!", transaction)
      );
    }
  }
);

export const fetchTransactions = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, ["name", "role"]);
    const options: IOptions = pick(req.query, [
      "sortBy",
      "limit",
      "page",
      "projectBy",
      "populate",
    ]);
    const result = await transactionService.fetchTransactions(
      req.user.id,
      filter,
      options
    );
    res.send(responsePayload(true, "Fetch transactions successfully!", result));
  }
);
