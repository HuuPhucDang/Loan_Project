import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import ApiError from "../../helper/errors/ApiError";
import { assignReturnUser } from "../../utils";
import { IUserDoc, ActiveBankBody } from "../../interfaces/user.interfaces";
import Bank from "../../models/bank.model";
import { getUserById } from "../user/user.service";

export const activeBank = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveBankBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  let findBank = await Bank.findOne({ userId });
  if (!findBank) {
    findBank = await Bank.create({
      ...updateBody,
      userId,
    });
    user.bank = findBank.id;
    await user.save();
    const savedUser = await getUserById(userId);
    if (savedUser) return assignReturnUser(savedUser);
    return null;
  }
  if (findBank.isVerified)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already active bank account!"
    );

  Object.assign(findBank, updateBody);
  await findBank.save();
  const savedUser = await getUserById(userId);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};
