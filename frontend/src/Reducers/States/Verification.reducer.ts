import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
  isUploadSuccess: false,
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
    case ACTION_TYPES.SET_VERIFICATION_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }
    case ACTION_TYPES.RESET_VERIFICATION_REDUCER:
      return DEFAULT_STATES;

    case ACTION_TYPES.UPLOAD_CARDS_ID_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isUploadSuccess: true,
      };
    case ACTION_TYPES.UPLOAD_CARDS_ID_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isUploadSuccess: false,
      };

    case ACTION_TYPES.FETCH_ALL_VERIFICATION_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isUploadSuccess: true,
        payload,
      };
    case ACTION_TYPES.FETCH_ALL_VERIFICATION_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isUploadSuccess: false,
        payload: {
          limit: 10,
          page: 1,
          results: [],
          totalPages: 1,
          totalResults: 0,
        },
      };

    case ACTION_TYPES.APPROVE_VERIFICATION_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isUploadSuccess: true,
      };
    case ACTION_TYPES.APPROVE_VERIFICATION_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isUploadSuccess: false,
      };

    case ACTION_TYPES.DENY_VERIFICATION_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isUploadSuccess: true,
      };
    case ACTION_TYPES.DENY_VERIFICATION_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isUploadSuccess: false,
      };

    default:
      return state;
  }
};
