import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
  payload: {
    accountNumber: '',
    bankName: '',
    fullname: '',
    message: '',
  },
};

export default (
  state = DEFAULT_STATES,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_SYSTEM_INFO_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }
    case ACTION_TYPES.RESET_SYSTEM_INFO_REDUCER:
      return DEFAULT_STATES;

    case ACTION_TYPES.GET_SYSTEM_INFO_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        payload,
      };
    case ACTION_TYPES.GET_SYSTEM_INFO_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        payload: {
          accountNumber: '',
          bankName: '',
          fullname: '',
          message: '',
        },
      };

    case ACTION_TYPES.UPDATE_SYSTEM_INFO_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.UPDATE_SYSTEM_INFO_FAILURE:
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
