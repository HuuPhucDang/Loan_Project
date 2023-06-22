import { ACTION_TYPES } from '@/Constants';

const initialState = {
  notification: null,
  startLoading: false,
  isLoading: false,
  alert: null,
};

export default (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_NOTIFICATION_MESSAGE:
      return {
        ...state,
        notification: payload,
      };
    case ACTION_TYPES.SET_START_LOADING:
      return {
        ...state,
        startLoading: payload,
      };
    case ACTION_TYPES.SET_LOADING_INSIDE_COMPONENT:
      return {
        ...state,
        isLoading: payload,
      };
    case ACTION_TYPES.SET_ALERT_MESSAGE:
      return {
        ...state,
        alert: payload,
      };
    default:
      return state;
  }
};
