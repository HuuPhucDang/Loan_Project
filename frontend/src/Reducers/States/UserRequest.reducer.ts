import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
  requestForgotPasswordSuccess: false,
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
    case ACTION_TYPES.SET_USER_REQUEST_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }
    case ACTION_TYPES.RESET_USER_REQUEST_REDUCER:
      return DEFAULT_STATES;

    case ACTION_TYPES.REQUEST_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        requestForgotPasswordSuccess: true,
      };
    case ACTION_TYPES.REQUEST_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        requestForgotPasswordSuccess: false,
      };

    case ACTION_TYPES.FETCH_USER_REQUESTS_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        payload,
      };
    case ACTION_TYPES.FETCH_USER_REQUESTS_FAILURE:
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

    default:
      return state;
  }
};
