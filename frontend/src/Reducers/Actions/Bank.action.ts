import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';
import { pushNotification } from '../../Libs/utils/Widget.utils';

// SINGLE ACTIONS
const setBankLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_BANK_ACTION_LOADING,
    payload,
  };
};

const resetBankReducer = () => {
  return {
    type: ACTION_TYPES.RESET_BANK_REDUCER,
  };
};

// ASYNC ACTIONS
const activeBankCardFail = () => {
  return {
    type: ACTION_TYPES.ACTIVE_BANK_CARD_FAILURE,
  };
};

const activeBankCardSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.ACTIVE_BANK_CARD_SUCCESS,
    payload,
  };
};

const activeBankCard = (payload: {
  fullname: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
}) => {
  return async (dispatch: any) => {
    dispatch(setBankLoading(true));
    await API.activeBankCard(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(activeBankCardFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          pushNotification({ type: 'success', message: resolveResult.message });
          Utils.setUserData(resolveResult.payload);
          dispatch(activeBankCardSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(activeBankCardFail());
      });
  };
};

export default { activeBankCard, resetBankReducer };
