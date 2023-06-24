import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { EMPLOYEE } = API;

export const fetchAllEmployees = async () => {
  return sendRequest(EMPLOYEE.BASIC, 'GET');
};

export const updateEmployee = async (id: string, payload: any) => {
  return sendRequest(`${EMPLOYEE.BASIC}/${id}`, 'PUT', payload);
};

export const createEmployee = async (payload: any) => {
  return sendRequest(`${EMPLOYEE.BASIC}/`, 'POST', payload);
};

export const updateContactList = async (payload: any) => {
  return sendRequest(`${EMPLOYEE.BASIC}/`, 'PUT', payload);
};
