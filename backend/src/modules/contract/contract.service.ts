import httpStatus from "http-status";
import mongoose from "mongoose";
import _ from "lodash";
import ApiError from "../../helper/errors/ApiError";
import { EVerifyType, IContractDoc } from "../../interfaces/contract.interface";
import { IOptions, QueryResult } from "../../helper/paginate/paginate";
import Contract from "../../models/contract.model";
import { getUserById } from "../user/user.service";
import Employee from "../../models/employee.model";
import User from "../../models/user.model";
import Wallet from "../../models/wallet.model";
import { contractTemplateService } from "../contractTemplate";
import moment from "moment";

const LIMIT_CONTRACT = 1;

/**
 * Create Contract
 */
export const createContract = async (
  userId: mongoose.Types.ObjectId,
  updateBody: {
    linkFB: string;
    signImage: string;
    money: number;
    month: number;
    interestRate: number;
  }
): Promise<IContractDoc | null> => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  const employee = await Employee.findOne({ contact: updateBody.linkFB });
  if (!employee)
    throw new ApiError(httpStatus.BAD_REQUEST, "Employee not found!");
  const allUserContracts = await Contract.find({
    userId,
    status: EVerifyType.ONPROCESSING,
  });
  if (allUserContracts.length >= LIMIT_CONTRACT)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User have another loans not paid yet!"
    );
  const getContent = await contractTemplateService.previewContract(
    userId,
    _.pick(updateBody, ["money", "month", "interestRate"])
  );
  const newContract = await Contract.create({
    ..._.omit(updateBody, "linkFB"),
    content: _.pick(getContent, [
      "header",
      "nameOfContract",
      "sideA",
      "sideB",
      "terms",
    ]),
    userId: user.id,
    employeeId: employee.id,
    signedDate: moment().format("DD/MM/YYYY"),
  });

  return newContract;
};

export const getById = async (
  id: mongoose.Types.ObjectId
): Promise<IContractDoc | null> => {
  return await Contract.findById(id).populate("userId").populate("employeeId");
};

export const updateContract = async (
  id: mongoose.Types.ObjectId,
  updateBody: {
    money: number;
    month: number;
    interestRate: number;
  }
): Promise<IContractDoc | null> => {
  const contract = await Contract.findById(id);
  if (!contract)
    throw new ApiError(httpStatus.BAD_REQUEST, "Contract not found!");
  Object.assign(contract, updateBody);
  await contract.save();
  return await getById(id);
};

export const fetchAllContracts = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const allVerifications = Contract.paginate(filter, {
    ...options,
    populate: "userId,employeeId",
  });
  return allVerifications;
};

export const approveContract = async (
  id: mongoose.Types.ObjectId
): Promise<IContractDoc | null> => {
  const contract = await Contract.findById(id);
  if (!contract)
    throw new ApiError(httpStatus.BAD_REQUEST, "Contract not found!");
  const user = await User.findById(contract.userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");
  const wallet = await Wallet.findById(user.wallet);
  if (!wallet) throw new ApiError(httpStatus.BAD_REQUEST, "Wallet not found!");

  contract.status = EVerifyType.ONPROCESSING;
  await contract.save();
  wallet.balance = wallet.balance + contract.money;
  await wallet.save();
  return await getById(id);
};

export const completeContract = async (
  id: mongoose.Types.ObjectId
): Promise<IContractDoc | null> => {
  const contract = await Contract.findById(id);
  if (!contract)
    throw new ApiError(httpStatus.BAD_REQUEST, "Contract not found!");
  contract.status = EVerifyType.DONE;
  await contract.save();
  return await getById(id);
};

export const denyContract = async (
  id: mongoose.Types.ObjectId
): Promise<null> => {
  const contract = await Contract.findById(id);
  if (!contract)
    throw new ApiError(httpStatus.BAD_REQUEST, "Contract not found!");
  if (contract.status === EVerifyType.DONE)
    throw new ApiError(httpStatus.BAD_REQUEST, "Contract has been completed!");
  if (contract.status === EVerifyType.ONPROCESSING)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Contract has been onprocessing!"
    );
  await contract.deleteOne();
  return null;
};
