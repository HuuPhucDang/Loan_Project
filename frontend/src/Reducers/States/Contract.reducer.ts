import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
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
    case ACTION_TYPES.SET_CONTRACT_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }

    case ACTION_TYPES.FETCH_CONTRACT_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        payload,
      };
    case ACTION_TYPES.FETCH_CONTRACT_FAILURE:
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

    case ACTION_TYPES.UPDATE_CONTRACT_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.UPDATE_CONTRACT_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.DENY_CONTRACT_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.DENY_CONTRACT_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };

    case ACTION_TYPES.APPROVE_CONTRACT_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.APPROVE_CONTRACT_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.COMPLETE_CONTACT_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.COMPLETE_CONTRACT_FAILURE:
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
