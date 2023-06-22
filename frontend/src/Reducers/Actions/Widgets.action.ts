import { ACTION_TYPES } from '@/Constants';
import { INotifications } from '@/Interfaces/Widget.interface';

// SINGLE ACTIONS
const setNotification = (payload: INotifications | null) => {
  return {
    type: ACTION_TYPES.SET_NOTIFICATION_MESSAGE,
    payload,
  };
};

const setAlert = (payload: INotifications | null) => {
  return {
    type: ACTION_TYPES.SET_ALERT_MESSAGE,
    payload,
  };
};

export default {
  setNotification,
  setAlert,
};
