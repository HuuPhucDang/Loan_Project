import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { USER_REQUEST } = API;

export const requestForgotPassword = async (payload: any) => {
  return sendRequest(USER_REQUEST.FORGOT_PASSWORD, 'POST', payload);
};

export const fetchUserRequests = async (payload: any) => {
  return sendRequest(USER_REQUEST.BASIC, 'GET', payload);
};
