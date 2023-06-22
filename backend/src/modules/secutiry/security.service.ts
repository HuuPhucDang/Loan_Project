import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import bcrypt from "bcryptjs";
import moment from "moment";
import User from "../../models/user.model";
import Notification from "../../models/notification.model";
import ApiError from "../../helper/errors/ApiError";
import { assignReturnUser } from "../../utils";
import {
  IUserDoc,
  ActiveUserPhonenumberBody,
  ActiveUserEmailBody,
  ActiveWithdrawPasswordBody,
  ChangeUserPasswordPasswordBody,
  ChangeUserEmailBody,
  ChangeWithdrawPasswordBody,
} from "../../interfaces/user.interfaces";
import Security from "../../models/security.model";
import { getUserById } from "../user/user.service";

/**
 * Create new Security
 */
const creatSecurity = async (
  user: IUserDoc,
  updateBody: any
): Promise<IUserDoc | null> => {
  const findSecurity = await Security.create({
    ...updateBody,
    userId: user.id,
  });
  user.security = findSecurity.id;
  await user.save();
  const savedUser = await getUserById(user.id);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};

/**
 * Verify user phonenumber
 */
export const verifyPhonenumber = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveUserPhonenumberBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");

  let findSecurity = await Security.findOne({ userId });
  if (!findSecurity) return await creatSecurity(user, updateBody);

  await Notification.create({
    userId: user.id,
    message: `Your phone number has been changed at ${moment().format(
      "DD/MM/YYYY HH:mm:ss"
    )}!`,
  });
  Object.assign(findSecurity, updateBody);
  await findSecurity.save();
  const savedUser = await getUserById(userId);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};

/**
 * Active user email
 */
export const activeUserEmail = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveUserEmailBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  let findSecurity = await Security.findOne({ userId });
  if (!findSecurity) return await creatSecurity(user, updateBody);
  if (findSecurity.email)
    throw new ApiError(httpStatus.BAD_REQUEST, "You already active email!");

  Object.assign(findSecurity, updateBody);
  await findSecurity.save();
  const savedUser = await getUserById(userId);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};

/**
 * Change user email
 */
export const changeUserEmail = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ChangeUserEmailBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password!");
  let findSecurity = await Security.findOne({ userId });
  if (!findSecurity) return await creatSecurity(user, updateBody);
  if (findSecurity.email !== updateBody.email)
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect email!");
  if (findSecurity.email === updateBody.newEmail)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The new email can not matches the old email!"
    );

  await Notification.create({
    userId: user.id,
    message: `Your email has been changed at ${moment().format(
      "DD/MM/YYYY HH:mm:ss"
    )}!`,
  });

  Object.assign(findSecurity, updateBody);
  await findSecurity.save();
  const savedUser = await getUserById(userId);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};

/**
 * Active Withdraw Password
 */
export const activeWithdrawPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ActiveWithdrawPasswordBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password!");
  let findSecurity = await Security.findOne({ userId });
  if (!findSecurity) return await creatSecurity(user, updateBody);
  if (findSecurity.withdrawPassword)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already active withdraw password!"
    );

  const hashPassword = await bcrypt.hash(updateBody.withdrawPassword, 8);

  Object.assign(findSecurity, {
    withdrawPassword: hashPassword,
  });
  await findSecurity.save();
  const savedUser = await getUserById(userId);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};

/**
 * CHange Withdraw Password
 */
export const changeWithdrawPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ChangeWithdrawPasswordBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password!");
  let findSecurity = await Security.findOne({ userId });
  if (!findSecurity) return await creatSecurity(user, updateBody);
  if (findSecurity.email !== updateBody.email)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Incorrect email or email not active!"
    );
  if (findSecurity.phonenumber !== updateBody.phonenumber)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Incorrect phonenumber or phonenumber not active!"
    );
  if (
    await findSecurity.isWithdrawPasswordMatch(updateBody.newWithdrawPassword)
  )
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The new password can not matches the old password!"
    );

  await Notification.create({
    userId: user.id,
    message: `Your withdraw password has been changed at ${moment().format(
      "DD/MM/YYYY HH:mm:ss"
    )}!`,
  });

  const hashPassword = await bcrypt.hash(updateBody.newWithdrawPassword, 8);

  Object.assign(findSecurity, {
    withdrawPassword: hashPassword,
  });
  await findSecurity.save();
  const savedUser = await getUserById(userId);
  if (savedUser) return assignReturnUser(savedUser);
  return null;
};

/**
 * Change user password
 */
export const changeUserPassword = async (
  userId: mongoose.Types.ObjectId,
  updateBody: ChangeUserPasswordPasswordBody
): Promise<IUserDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  if (!(await user.isPasswordMatch(updateBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect password!");

  await Notification.create({
    userId: user.id,
    message: `Your login password has been changed at ${moment().format(
      "DD/MM/YYYY HH:mm:ss"
    )}!`,
  });

  Object.assign(user, {
    password: updateBody.newPassword,
  });
  await user.save();
  return assignReturnUser(user);
};
