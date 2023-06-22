import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { BANK } = API;

export const activeBankCard = async (payload: {
  fullname: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
}) => {
  return sendRequest(BANK.ACTIVE_BANK_CARD, 'PUT', payload);
};
