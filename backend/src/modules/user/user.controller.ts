import httpStatus from "http-status";
import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import ApiError from "../../helper/errors/ApiError";
import { pick, responsePayload } from "../../utils";
import { IOptions } from "../../helper/paginate/paginate";
import * as userService from "./user.service";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "role"]);
  const options: IOptions = pick(req.query, [
    "sortBy",
    "limit",
    "page",
    "projectBy",
    "populate",
  ]);
  const result = await userService.queryUsers(filter, options);
  res.send(responsePayload(true, "Fetch users successfully!", result));
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["userId"] === "string") {
    const user = await userService.getUserById(
      new mongoose.Types.ObjectId(req.params["userId"])
    );
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    res.send(responsePayload(true, "Get user successfully!", user));
  }
});

export const getSelf = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  res.send(responsePayload(true, "Get self successfully!", user));
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["userId"] === "string") {
    const user = await userService.updateUserById(
      new mongoose.Types.ObjectId(req.params["userId"]),
      req.body
    );
    res.send(responsePayload(true, "Update user successfully!", user));
  }
});

export const updateUserAvatar = catchAsync(
  async (req: Request, res: Response) => {
    const user = await userService.updateUserAvatar(
      new mongoose.Types.ObjectId(req.user.id),
      req.body
    );
    res.send(responsePayload(true, "Update avatar successfully!", user));
  }
);

export const updateUserNickname = catchAsync(
  async (req: Request, res: Response) => {
    const user = await userService.updateUserNickname(
      new mongoose.Types.ObjectId(req.user.id),
      req.body
    );
    res.send(responsePayload(true, "Update nickname successfully!", user));
  }
);

export const updateUserType = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["userId"] === "string") {
      const user = await userService.updateUserType(
        new mongoose.Types.ObjectId(req.params["userId"]),
        req.body
      );
      res.send(responsePayload(true, "Update user successfully!", user));
    }
  }
);
