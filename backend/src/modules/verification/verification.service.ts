import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import { assignReturnUser } from "../../utils";
import ApiError from "../../helper/errors/ApiError";
import { IUserDoc, UploadIDCards } from "../../interfaces/user.interfaces";
import { EVerifyType } from "../../interfaces/verification.interface";
import { IOptions, QueryResult } from "../../helper/paginate/paginate";
import Verification from "../../models/verification.model";
import { getUserById } from "../user/user.service";

/**
 * Upload ID Card
 */
export const uploadIdCards = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UploadIDCards
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  let findVerification = await Verification.findOne({ userId });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!findVerification) {
    findVerification = await Verification.create({
      ...updateBody,
      userId,
    });
    user.verification = findVerification.id;
    (await user.save()).populate("verification");
    return assignReturnUser(user);
  }
  // if (findVerification.status === EVerifyType.PENDING)
  //   throw new ApiError(httpStatus.BAD_REQUEST, "You already upload ID cards!");
  // if (findVerification.status === EVerifyType.APPROVED)
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     "Admin has been verified your information!"
  //   );
  // if (findVerification.status === EVerifyType.DENY)
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     "Admin has been denied your information!"
  //   );

  Object.assign(findVerification, {
    ...updateBody,
    status: EVerifyType.PENDING,
  });
  await findVerification.save();
  const savedUser = await getUserById(userId);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};

export const changeIDCardStatus = async (
  userId: mongoose.Types.ObjectId,
  status: EVerifyType
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const findVerification = await Verification.findOne({ userId });
  if (!findVerification)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Can not find any verification!"
    );
  if (findVerification.status === EVerifyType.APPROVED)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "This ID card has been verified!"
    );
  if (findVerification.status === EVerifyType.DENY)
    throw new ApiError(httpStatus.BAD_REQUEST, "This ID card has been denied!");

  findVerification.status = status;
  if (status === EVerifyType.DENY) {
    findVerification.selfieImageUrl = '';
    findVerification.frontImageUrl = '';
    findVerification.backImageUrl = '';
  }
  await findVerification.save();
  const savedUser = await getUserById(userId);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};

export const fetchAllIDCards = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const allVerifications = Verification.paginate(filter, {
    ...options,
    populate: "userId,selfieImageUrl",
  });
  return allVerifications;
};
