import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { NOTIFICATION } = API;

export const fetchNotification = async () => {
  return sendRequest(NOTIFICATION.BASIC, 'GET');
};
