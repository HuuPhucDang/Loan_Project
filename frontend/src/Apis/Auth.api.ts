import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { AUTH } = API;

export const login = async (payload: {
  username: string;
  password: string;
}) => {
  return sendRequest(AUTH.LOGIN, 'POST', payload);
};

export const register = async (payload: {
  username: string;
  password: string;
  confirmPassword: string;
  inviteCode: string;
}) => {
  return sendRequest(AUTH.REGISTER, 'POST', payload);
};
