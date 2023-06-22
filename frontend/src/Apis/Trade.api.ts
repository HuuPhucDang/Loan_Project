import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { TRADE } = API;

export const fetchTrande = async () => {
  return sendRequest(TRADE.BASIC, 'GET');
};

export const createNewTrade = async (payload: any) => {
  return sendRequest(TRADE.BASIC, 'POST', payload);
};
