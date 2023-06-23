import httpStatus from "http-status";
import _ from "lodash";
import UserRequest from "../../models/userRequest.model";
import ApiError from "../../helper/errors/ApiError";
import { IOptions, QueryResult } from "../../helper/paginate/paginate";
import { ForgotPassword } from "../../interfaces/user.interfaces";
import {
  IUserRequestDoc,
  ERequestType,
} from "../../interfaces/userRequest.interface";
import { getUserByUsername } from "../user/user.service";

/**
 * Request forgot password
 */
export const requestForgotPassword = async (
  postBody: ForgotPassword
): Promise<IUserRequestDoc | null> => {
  const user = await getUserByUsername(postBody.username);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Username not found!");
  const userRequest = await UserRequest.create({
    message: postBody.message,
    userId: user.id,
    type: ERequestType.FORGOT_PASSWORD,
  });
  return userRequest;
};

/**
 * Fetch all requests
 */
export const fetchAllRequests = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const userRequests = await UserRequest.paginate(filter, options);
  return userRequests;
};
