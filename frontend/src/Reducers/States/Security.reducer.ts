import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
  isSubmitPasswordSuccess: false,
  isSubmitPhoneNumberSuccess: false,
  isSubmitEmailSuccess: false,
  isSubmitWithdrawPasswordSuccess: false,
};

export default (
  state = DEFAULT_STATES,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_SECURITY_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }
    case ACTION_TYPES.RESET_SECURITY_REDUCER:
      return DEFAULT_STATES;

    case ACTION_TYPES.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isSubmitPasswordSuccess: true,
      };
    case ACTION_TYPES.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isSubmitPasswordSuccess: false,
      };

    case ACTION_TYPES.VERIFY_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isSubmitPhoneNumberSuccess: true,
      };
    case ACTION_TYPES.VERIFY_PHONE_NUMBER_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isSubmitPhoneNumberSuccess: false,
      };

    case ACTION_TYPES.ACTIVE_EMAIL_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isSubmitEmailSuccess: true,
      };
    case ACTION_TYPES.ACTIVE_EMAIL_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isSubmitEmailSuccess: false,
      };

    case ACTION_TYPES.CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isSubmitEmailSuccess: true,
      };
    case ACTION_TYPES.CHANGE_EMAIL_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isSubmitEmailSuccess: false,
      };

    case ACTION_TYPES.ACTIVE_WITHDRAW_PASSWORD_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isSubmitWithdrawPasswordSuccess: true,
      };
    case ACTION_TYPES.ACTIVE_WITHDRAW_PASSWORD_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isSubmitWithdrawPasswordSuccess: false,
      };

    case ACTION_TYPES.CHANGE_WITHDRAW_PASSWORD_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isSubmitWithdrawPasswordSuccess: true,
      };
    case ACTION_TYPES.CHANGE_WITHDRAW_PASSWORD_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isSubmitWithdrawPasswordSuccess: false,
      };

    default:
      return state;
  }
};
