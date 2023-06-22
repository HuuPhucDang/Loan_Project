import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';
import { pushNotification } from '../../Libs/utils/Widget.utils';

// SINGLE ACTIONS
const setTransactionLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_TRANSACTION_ACTION_LOADING,
    payload,
  };
};

const resetTransactionReducer = () => {
  return {
    type: ACTION_TYPES.RESET_TRANSACTION_REDUCER,
  };
};

// ASYNC ACTIONS
const fetchTransactionsFail = () => {
  return {
    type: ACTION_TYPES.FETCH_TRANSACTIONS_FAILURE,
  };
};

const fetchTransactionsSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_TRANSACTIONS_SUCCESS,
    payload,
  };
};

const fetchTransactions = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setTransactionLoading(true));
    await API.fetchTransactions(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(fetchTransactionsFail());
        else {
          const resolveResult: { message: string; payload: any } = results as {
            message: string;
            payload: any;
          };
          dispatch(fetchTransactionsSuccess(resolveResult.payload));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchTransactionsFail());
      });
  };
};

const requestWithdrawFail = () => {
  return {
    type: ACTION_TYPES.REQUEST_WITHDRAW_FAILURE,
  };
};

const requestWithdrawSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.REQUEST_WITHDRAW_SUCCESS,
    payload,
  };
};

const requestWithdraw = (payload: {
  amount: number;
  withdrawPassword: string;
}) => {
  return async (dispatch: any) => {
    dispatch(setTransactionLoading(true));
    await API.requestWithdraw(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        const resolveResult: { message: string } = results as {
          message: string;
        };
        if (!results) await dispatch(requestWithdrawFail());
        else {
          pushNotification({
            type: 'success',
            message: resolveResult.message,
          });
          dispatch(requestWithdrawSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(requestWithdrawFail());
      });
  };
};

const requestRechargeFail = () => {
  return {
    type: ACTION_TYPES.REQUEST_RECHARGE_FAILURE,
  };
};

const requestRechargeSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.REQUEST_RECHARGE_SUCCESS,
    payload,
  };
};

const requestRecharge = (payload: { amount: number }) => {
  return async (dispatch: any) => {
    dispatch(setTransactionLoading(true));
    await API.requestRecharge(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        const resolveResult: { message: string } = results as {
          message: string;
        };
        if (!results) await dispatch(requestRechargeFail());
        else {
          pushNotification({
            type: 'success',
            message: resolveResult.message,
          });
          dispatch(requestRechargeSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(requestRechargeFail());
      });
  };
};

const rechargeMoneyFail = () => {
  return {
    type: ACTION_TYPES.RECHARGE_MONEY_FAILURE,
  };
};

const rechargeMoneySuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.RECHARGE_MONEY_SUCCESS,
    payload,
  };
};

const rechargeMoney = (
  id: string,
  payload: { userId: string; amount: number },
  filterParams: any
) => {
  return async (dispatch: any) => {
    dispatch(setTransactionLoading(true));
    await API.rechargeMoney(id, payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        const { message }: { message: string } = results as { message: string };
        if (!results) await dispatch(rechargeMoneyFail());
        else {
          pushNotification({ type: 'success', message });
          dispatch(fetchTransactions(filterParams));
          dispatch(rechargeMoneySuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(rechargeMoneyFail());
      });
  };
};

const withdrawMoneyFail = () => {
  return {
    type: ACTION_TYPES.WITHDRAW_MONEY_FAILURE,
  };
};

const withdrawMoneySuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.WITHDRAW_MONEY_SUCCESS,
    payload,
  };
};

const withdrawMoney = (
  id: string,
  payload: { userId: string; amount: number },
  filterParams: any
) => {
  return async (dispatch: any) => {
    dispatch(setTransactionLoading(true));
    await API.withdrawMoney(id, payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        const { message }: { message: string } = results as { message: string };
        if (!results) await dispatch(withdrawMoneyFail());
        else {
          pushNotification({ type: 'success', message });
          dispatch(fetchTransactions(filterParams));
          dispatch(withdrawMoneySuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(withdrawMoneyFail());
      });
  };
};

const cancelTransactionFail = () => {
  return {
    type: ACTION_TYPES.CANCEL_TRANSACTION_FAILURE,
  };
};

const cancelTransactionSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.CANCEL_TRANSACTION_SUCCESS,
    payload,
  };
};

const cancelTransaction = (id: string, filterParams: any) => {
  return async (dispatch: any) => {
    dispatch(setTransactionLoading(true));
    await API.cancelTransaction(id)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        const { message }: { message: string } = results as { message: string };
        if (!results) await dispatch(cancelTransactionFail());
        else {
          pushNotification({ type: 'success', message });
          dispatch(fetchTransactions(filterParams));
          dispatch(cancelTransactionSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(cancelTransactionFail());
      });
  };
};

const denyTransactionFail = () => {
  return {
    type: ACTION_TYPES.DENY_TRANSACTION_FAILURE,
  };
};

const denyTransactionSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.DENY_TRANSACTION_SUCCESS,
    payload,
  };
};

const denyTransaction = (id: string, filterParams: any) => {
  return async (dispatch: any) => {
    dispatch(setTransactionLoading(true));
    await API.denyTransaction(id)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        const { message }: { message: string } = results as { message: string };
        if (!results) await dispatch(denyTransactionFail());
        else {
          pushNotification({ type: 'success', message });
          dispatch(fetchTransactions(filterParams));
          dispatch(denyTransactionSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(denyTransactionFail());
      });
  };
};

export default {
  resetTransactionReducer,
  fetchTransactions,
  requestWithdraw,
  denyTransaction,
  cancelTransaction,
  withdrawMoney,
  rechargeMoney,
  requestRecharge,
};
