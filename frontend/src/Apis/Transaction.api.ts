import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { TRANSACTION } = API;

export const fetchTransactions = async (payload: any) => {
  return sendRequest(TRANSACTION.BASIC, 'GET', payload);
};

export const requestWithdraw = async (payload: {
  amount: number;
  withdrawPassword: string;
}) => {
  return sendRequest(TRANSACTION.REQUEST_WITHDRAW, 'POST', payload);
};

export const requestRecharge = async (payload: { amount: number }) => {
  return sendRequest(TRANSACTION.REQUEST_RECHARGE, 'POST', payload);
};

export const rechargeMoney = async (
  id: string,
  payload: { userId: string; amount: number }
) => {
  return sendRequest(`${TRANSACTION.RECHARGE_MONEY}/${id}`, 'PUT', payload);
};

export const withdrawMoney = async (
  id: string,
  payload: { userId: string; amount: number }
) => {
  return sendRequest(`${TRANSACTION.WITHDRAW_MONEY}/${id}`, 'PUT', payload);
};

export const cancelTransaction = async (id: string) => {
  return sendRequest(`${TRANSACTION.CANCEL_TRANSACTION}/${id}`, 'PUT');
};

export const denyTransaction = async (id: string) => {
  return sendRequest(`${TRANSACTION.DENY_TRANSACTIOn}/${id}`, 'PUT');
};
