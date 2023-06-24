import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';
import { pushNotification } from '../../Libs/utils/Widget.utils';

// SINGLE ACTIONS
const setVerificationLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_CONTRACT_ACTION_LOADING,
    payload,
  };
};

// ASYNC ACTIONS
const updateContractFail = () => {
  return {
    type: ACTION_TYPES.UPLOAD_CARDS_ID_FAILURE,
  };
};

const updateContractSuccess = () => {
  return {
    type: ACTION_TYPES.UPLOAD_CARDS_ID_SUCCESS,
  };
};

const updateContract = (id: string, payload: FormData, filterParams: any) => {
  return async (dispatch: any) => {
    dispatch(setVerificationLoading(true));
    await API.updateContract(id, payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(updateContractFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          pushNotification({ type: 'success', message: resolveResult.message });
          // Utils.setUserData(resolveResult.payload);
          dispatch(updateContractSuccess());
          dispatch(fetchAllContract(filterParams));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateContractFail());
      });
  };
};

const fetchAllVerificationFail = () => {
  return {
    type: ACTION_TYPES.FETCH_CONTRACT_FAILURE,
  };
};

const fetchAllVerificationSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_CONTRACT_SUCCESS,
    payload,
  };
};

const fetchAllContract = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setVerificationLoading(true));
    await API.fetchAllContracts(payload)
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
    type: ACTION_TYPES.APPROVE_CONTRACT_FAILURE,
  };
};

const approveVerificationSuccess = () => {
  return {
    type: ACTION_TYPES.APPROVE_CONTRACT_SUCCESS,
  };
};

const approveContract = (id: string, filterParams: any) => {
  return async (dispatch: any) => {
    dispatch(setVerificationLoading(true));
    await API.approveContract(id)
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
          dispatch(fetchAllContract(filterParams));
          dispatch(approveVerificationSuccess());
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
    type: ACTION_TYPES.DENY_CONTRACT_FAILURE,
  };
};

const denyVerificationSuccess = () => {
  return {
    type: ACTION_TYPES.DENY_CONTRACT_SUCCESS,
  };
};

const denyContract = (id: string, filterParams: any) => {
  return async (dispatch: any) => {
    dispatch(setVerificationLoading(true));
    await API.denyContract(id)
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
          dispatch(fetchAllContract(filterParams));
          dispatch(denyVerificationSuccess());
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(denyVerificationFail());
      });
  };
};

const completeContractFail = () => {
  return {
    type: ACTION_TYPES.COMPLETE_CONTACT_FAILURE,
  };
};

const completeContractSuccess = () => {
  return {
    type: ACTION_TYPES.COMPLETE_CONTACT_SUCCESS,
  };
};

const completeContract = (id: string, filterParams: any) => {
  return async (dispatch: any) => {
    dispatch(setVerificationLoading(true));
    await API.completeContract(id)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(completeContractFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          pushNotification({ type: 'success', message: resolveResult.message });
          dispatch(fetchAllContract(filterParams));
          dispatch(completeContractSuccess());
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(completeContractFail());
      });
  };
};

export default {
  updateContract,
  approveContract,
  denyContract,
  fetchAllContract,
  completeContract,
};
