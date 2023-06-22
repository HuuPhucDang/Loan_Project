import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { SECURITY } = API;

export const changePassword = async (payload: {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  return sendRequest(SECURITY.CHANGE_PASSWORD, 'PUT', payload);
};


export const verifyPhoneNumber = async (payload: {
  phonenumber: string;
}) => {
  return sendRequest(SECURITY.VERIFY_PHONE_NUMBER, 'PUT', payload);
};

export const activeEmail = async (payload: {
  password: string;
  email: string;
}) => {
  return sendRequest(SECURITY.ACTIVE_EMAIL, 'PUT', payload);
};

export const changeEmail = async (payload: {
  password: string;
  email: string;
  newEmail?: string;
}) => {
  return sendRequest(SECURITY.CHANGE_EMAIL, 'PUT', payload);
};

export const activeWithdrawPassword = async (payload: {
  password: string;
  withdrawPassword: string;
}) => {
  return sendRequest(SECURITY.ACTIVE_WITHDRAW_PASSWORD, 'PUT', payload);
};

export const changeWithdrawPassword = async (payload: {
  email: string;
  phonenumber: string;
  password: string;
  newWithdrawPassword: string;
}) => {
  return sendRequest(SECURITY.CHANGE_WITHDRAW_PASSWORD, 'PUT', payload);
};

