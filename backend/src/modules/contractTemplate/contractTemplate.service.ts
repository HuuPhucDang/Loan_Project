import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import ApiError from "../../helper/errors/ApiError";
import { IContractTemplateDoc } from "../../interfaces/contractTemplate.interface";
import ContractTemplate from "../../models/contractTemplate.model";
import User from "../../models/user.model";

export const getTemplate = async (): Promise<IContractTemplateDoc | null> => {
  const findAll = await ContractTemplate.find();
  if (!findAll.length)
    return await ContractTemplate.create({
      header: "",
      nameOfContract: "",
      sideA: "",
      sideB: "",
      terms: "",
    });
  return findAll[0] || null;
};

export const updateTemplate = async (
  inforId: mongoose.Types.ObjectId,
  updateBody: {
    header: string;
    nameOfContract: string;
    sideA: string;
    sideB: string;
    terms: string;
  }
): Promise<IContractTemplateDoc | null> => {
  const systemInfor = await ContractTemplate.findOne(inforId);
  if (!systemInfor)
    throw new ApiError(httpStatus.NOT_FOUND, "Template not found!");
  Object.assign(
    systemInfor,
    _.pick(updateBody, ["header", "nameOfContract", "sideA", "sideB", "terms"])
  );
  await systemInfor.save();
  return systemInfor;
};

export const previewContract = async (
  userId: mongoose.Types.ObjectId,
  updateBody: { money: number; month: number; interestRate: number }
): Promise<IContractTemplateDoc | null> => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const template = await ContractTemplate.find();
  if (!template[0])
    throw new ApiError(httpStatus.NOT_FOUND, "No Contract not found!");
  template[0].sideB = template[0].sideB
    .replace("$_HOVATEN", user.fullname)
    .replace("$_IDCARD", user.idNumber)
    .replace("$_TIENVAY", updateBody.money.toString())
    .replace("$_THANGVAY", updateBody.month.toString())
    .replace("$_LAIXUAT", updateBody.interestRate.toString());
  return template[0];
};
