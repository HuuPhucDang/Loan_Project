import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { SYSTEM_INFO } = API;

export const getSystemInfo = async () => {
  return sendRequest(SYSTEM_INFO.BASIC, 'GET');
};

export const updateSystemInfo = async (id: string, payload: any) => {
  return sendRequest(`${SYSTEM_INFO.BASIC}/${id}`, 'PUT', payload);
};
