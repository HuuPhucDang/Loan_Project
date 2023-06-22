import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';
import { pushNotification } from '../../Libs/utils/Widget.utils';

// SINGLE ACTIONS
const setUserRequestLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_USER_REQUEST_ACTION_LOADING,
    payload,
  };
};

const resetUserRequestReducer = () => {
  return {
    type: ACTION_TYPES.RESET_USER_REQUEST_REDUCER,
  };
};

// ASYNC ACTIONS
const requestForgotPasswordFail = () => {
  return {
    type: ACTION_TYPES.REQUEST_FORGOT_PASSWORD_FAILURE,
  };
};

const requestForgotPasswordSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.REQUEST_FORGOT_PASSWORD_SUCCESS,
    payload,
  };
};

const requestForgotPassword = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setUserRequestLoading(true));
    await API.requestForgotPassword(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(requestForgotPasswordFail());
        else {
          const { message }: { message: string } = results as {
            message: string;
          };
          pushNotification({ type: 'success', message });
          dispatch(requestForgotPasswordSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(requestForgotPasswordFail());
      });
  };
};

const fetchUserRequestsFail = () => {
  return {
    type: ACTION_TYPES.FETCH_USER_REQUESTS_FAILURE,
  };
};

const fetchUserRequestsSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_USER_REQUESTS_SUCCESS,
    payload,
  };
};

const fetchUserRequests = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setUserRequestLoading(true));
    await API.fetchUserRequests(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(fetchUserRequestsFail());
        else {
          const resolveResult: { message: string; payload: any } = results as {
            message: string;
            payload: any;
          };

          dispatch(fetchUserRequestsSuccess(resolveResult.payload));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchUserRequestsFail());
      });
  };
};

export default {
  resetUserRequestReducer,
  fetchUserRequests,
  requestForgotPassword,
};
