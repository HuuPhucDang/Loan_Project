import httpStatus from "http-status";
import _ from "lodash";
import mongoose from "mongoose";
import ApiError from "../../helper/errors/ApiError";
import {
  ITradeHistoryDoc,
  CreateNewTradeBody,
} from "../../interfaces/tradeHistoryHistory.interface";
import { EUserType } from "../../interfaces/userType.interface";
import TradeHistory from "../../models/tradeHistory.model";
import Wallet from "../../models/wallet.model";
import UserType from "../../models/userType.model";
import { getUserById } from "../user/user.service";
import moment from "moment";

const LIMIT_BET = {
  [EUserType.BEGINNER]: [0],
  [EUserType.INTERMEDIATE]: [0, 1],
  [EUserType.ADVANCE]: [0, 1, 2],
  [EUserType.PROFESSINAL]: [0, 1, 2, 3],
};

/**
 * Create new Trade
 */
export const createNewTrade = async (
  userId: mongoose.Types.ObjectId,
  createBody: CreateNewTradeBody
): Promise<ITradeHistoryDoc> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const wallet = await Wallet.findOne({ userId });
  if (!wallet)
    throw new ApiError(httpStatus.BAD_REQUEST, "User not active wallet!");
  if (wallet.balance < createBody.betAmount)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Your balance is not enough to play!"
    );
  const userType = await UserType.findOne({ userId });
  if (!userType || !LIMIT_BET[userType.type].includes(createBody.index))
    throw new ApiError(httpStatus.BAD_REQUEST, "Your level lower bet level!");
  wallet.balance = wallet.balance - createBody.betAmount;
  await wallet.save();
  const savedTrade = await TradeHistory.create({
    ...createBody,
    userId,
    betTime: moment().format("DD/MM/YYYY hh:mm:ss"),
  });
  global.io.emit("updateTradeListNow", { userId, balance: wallet.balance });
  return savedTrade;
};

/**
 * fetch all trades
 */
export const fetchAllTrades = async (
  userId: mongoose.Types.ObjectId
): Promise<ITradeHistoryDoc[]> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  return await TradeHistory.find({ userId }).sort({ betTime: -1 });
};
