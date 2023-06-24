import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { SYSTEM_INFO } = API;

export const getSystemInfo = async () => {
  return sendRequest(SYSTEM_INFO.BASIC, 'GET');
};

export const updateSystemInfo = async (id: string, payload: any) => {
  return sendRequest(`${SYSTEM_INFO.BASIC}/${id}`, 'PUT', payload);
};

export const updateContract = async (id: string, payload: any) => {
  return sendRequest(`${SYSTEM_INFO.FETCH}/${id}`, 'PUT', payload);
};

export const approveContract = async (id: string) => {
  return sendRequest(`${SYSTEM_INFO.APPROVE_CONTRACT}/${id}`, 'PUT');
};

export const denyContract = async (id: string) => {
  return sendRequest(`${SYSTEM_INFO.DENY_CONTRACT}/${id}`, 'PUT');
};
export const completeContract = async (id: string) => {
  return sendRequest(`${SYSTEM_INFO.COMPLETE_CONTRACT}/${id}`, 'PUT');
};

export const fetchAllContracts = async (payload: any) => {
  return sendRequest(`${SYSTEM_INFO.FETCH}`, 'GET', payload);
};
