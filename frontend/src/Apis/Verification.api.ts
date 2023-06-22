import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { VERIFICATION } = API;

export const fetchAllVerification = async (payload: any) => {
  return sendRequest(VERIFICATION.BASIC, 'GET', payload);
};

export const uploadCardsId = async (payload: FormData) => {
  return sendRequest(VERIFICATION.UPLOAD_CARDS_ID, 'FORM_DATA', payload);
};

export const approveVerification = async (id: string) => {
  return sendRequest(`${VERIFICATION.APPROVE}/${id}`, 'PUT');
};

export const denyVerification = async (id: string) => {
  return sendRequest(`${VERIFICATION.DENY}/${id}`, 'PUT');
};
