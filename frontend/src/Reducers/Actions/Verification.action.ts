import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';
import { pushNotification } from '../../Libs/utils/Widget.utils';
import UserActions from './User.action'

// SINGLE ACTIONS
const setVerificationLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_VERIFICATION_ACTION_LOADING,
    payload,
  };
};

const resetVerificationReducer = () => {
  return {
    type: ACTION_TYPES.RESET_VERIFICATION_REDUCER,
  };
};

// ASYNC ACTIONS
const uploadCardsIdFail = () => {
  return {
    type: ACTION_TYPES.UPLOAD_CARDS_ID_FAILURE,
  };
};

const uploadCardsIdSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPLOAD_CARDS_ID_SUCCESS,
    payload,
  };
};

const uploadCardsId = (payload: FormData) => {
  return async (dispatch: any) => {
    dispatch(setVerificationLoading(true));
    await API.uploadCardsId(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(uploadCardsIdFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          pushNotification({ type: 'success', message: resolveResult.message });
          // Utils.setUserData(resolveResult.payload);
          dispatch(uploadCardsIdSuccess(results));
          dispatch(UserActions.getSelf())
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(uploadCardsIdFail());
      });
  };
};

const fetchAllVerificationFail = () => {
  return {
    type: ACTION_TYPES.FETCH_ALL_VERIFICATION_FAILURE,
  };
};

const fetchAllVerificationSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_ALL_VERIFICATION_SUCCESS,
    payload,
  };
};

const fetchAllVerification = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setVerificationLoading(true));
    await API.fetchAllVerification(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(fetchAllVerificationFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          dispatch(fetchAllVerificationSuccess(resolveResult.payload));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchAllVerificationFail());
      });
  };
};

const approveVerificationFail = () => {
  return {
    type: ACTION_TYPES.APPROVE_VERIFICATION_FAILURE,
  };
};

const approveVerificationSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.APPROVE_VERIFICATION_SUCCESS,
    payload,
  };
};

const approveVerification = (id: string, filterParams: any) => {
  return async (dispatch: any) => {
    dispatch(setVerificationLoading(true));
    await API.approveVerification(id)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(approveVerificationFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          pushNotification({ type: 'success', message: resolveResult.message });
          dispatch(fetchAllVerification(filterParams));
          dispatch(approveVerificationSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(approveVerificationFail());
      });
  };
};

const denyVerificationFail = () => {
  return {
    type: ACTION_TYPES.DENY_VERIFICATION_FAILURE,
  };
};

const denyVerificationSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.DENY_VERIFICATION_SUCCESS,
    payload,
  };
};

const denyVerification = (id: string, filterParams: any) => {
  return async (dispatch: any) => {
    dispatch(setVerificationLoading(true));
    await API.denyVerification(id)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(denyVerificationFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          pushNotification({ type: 'success', message: resolveResult.message });
          dispatch(fetchAllVerification(filterParams));
          dispatch(denyVerificationSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(denyVerificationFail());
      });
  };
};

export default {
  resetVerificationReducer,
  uploadCardsId,
  approveVerification,
  denyVerification,
  fetchAllVerification,
};
