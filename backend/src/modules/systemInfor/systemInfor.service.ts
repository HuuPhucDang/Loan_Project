import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import SystemInfor from "../../models/systemInfor.model";
import ApiError from "../../helper/errors/ApiError";
import {
  ISystemInforDoc,
  UpdateSystemInforBody,
} from "../../interfaces/systemInfo.interface";

export const getSystemInfor = async (): Promise<ISystemInforDoc | null> => {
  const findAll = await SystemInfor.find().populate("QRUrl");
  if (!findAll.length)
    return await SystemInfor.create({
      // QRUrl: "",
      fullname: "",
      accountNumber: "",
      bankName: "",
      message: `Chuyển khoản nạp tiền tại trang ***.com`,
    });
  return findAll[0] || null;
};

export const updateSystemInfo = async (
  inforId: mongoose.Types.ObjectId,
  updateBody: UpdateSystemInforBody
): Promise<ISystemInforDoc | null> => {
  const systemInfor = await SystemInfor.findOne(inforId);
  if (!systemInfor)
    throw new ApiError(httpStatus.NOT_FOUND, "Infor not found!");
  Object.assign(systemInfor, updateBody);
  await systemInfor.save();
  return systemInfor;
};
