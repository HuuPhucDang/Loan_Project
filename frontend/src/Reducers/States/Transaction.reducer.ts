import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
  requestWithdrawSuccess: false,
  requestRechargeSuccess: false,
  rechargeMoneySuccess: false,
  withdrawMoneySuccess: false,
  payload: {
    limit: 10,
    page: 1,
    results: [],
    totalPages: 1,
    totalResults: 0,
  },
};

export default (
  state = DEFAULT_STATES,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_TRANSACTION_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }
    case ACTION_TYPES.RESET_TRANSACTION_REDUCER:
      return DEFAULT_STATES;

    case ACTION_TYPES.FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        payload,
      };
    case ACTION_TYPES.FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        payload: {
          limit: 10,
          page: 1,
          results: [],
          totalPages: 1,
          totalResults: 0,
        },
      };

    case ACTION_TYPES.REQUEST_WITHDRAW_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        requestWithdrawSuccess: true,
      };
    case ACTION_TYPES.REQUEST_WITHDRAW_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        requestWithdrawSuccess: false,
      };

    case ACTION_TYPES.REQUEST_RECHARGE_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        requestRechargeSuccess: true,
      };
    case ACTION_TYPES.REQUEST_RECHARGE_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        requestRechargeSuccess: false,
      };

    case ACTION_TYPES.RECHARGE_MONEY_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        rechargeMoneySuccess: true,
      };
    case ACTION_TYPES.RECHARGE_MONEY_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        rechargeMoneySuccess: false,
      };

    case ACTION_TYPES.WITHDRAW_MONEY_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        withdrawMoneySuccess: true,
      };
    case ACTION_TYPES.WITHDRAW_MONEY_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        withdrawMoneySuccess: false,
      };

    case ACTION_TYPES.CANCEL_TRANSACTION_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.CANCEL_TRANSACTION_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };

    case ACTION_TYPES.DENY_TRANSACTION_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.DENY_TRANSACTION_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };

    default:
      return state;
  }
};
