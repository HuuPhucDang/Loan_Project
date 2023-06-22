import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';

// SINGLE ACTIONS
const setNotificationLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_NOTIFICATION_ACTION_LOADING,
    payload,
  };
};

const resetNotificationReducer = () => {
  return {
    type: ACTION_TYPES.RESET_NOTIFICATION_REDUCER,
  };
};

// ASYNC ACTIONS
const fetchNotificationFail = () => {
  return {
    type: ACTION_TYPES.FETCH_NOTIFICATION_FAILURE,
  };
};

const fetchNotificationSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_NOTIFICATION_SUCCESS,
    payload,
  };
};

const fetchNotification = () => {
  return async (dispatch: any) => {
    dispatch(setNotificationLoading(true));
    await API.fetchNotification()
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(fetchNotificationFail());
        else {
          const { payload }: { payload: any } = results as { payload: any };
          dispatch(fetchNotificationSuccess(payload));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchNotificationFail());
      });
  };
};

export default {
  resetNotificationReducer,
  fetchNotification,
};
