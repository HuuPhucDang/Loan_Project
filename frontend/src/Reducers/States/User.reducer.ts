import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
  isUpdateNicknameSuccess: false,
  isUpdateAvatarSuccess: false,
  isUpdatePasswordSuccess: false,
  details: {},
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
    case ACTION_TYPES.SET_USER_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }
    case ACTION_TYPES.RESET_USER_REDUCER:
      return DEFAULT_STATES;

    case ACTION_TYPES.UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isUpdateAvatarSuccess: true,
      };
    case ACTION_TYPES.UPDATE_AVATAR_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isUpdateAvatarSuccess: false,
      };

    case ACTION_TYPES.FETCH_USERS_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        payload,
      };
    case ACTION_TYPES.FETCH_USERS_FAILURE:
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

    case ACTION_TYPES.GET_SELF_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        details: payload,
      };
    case ACTION_TYPES.GET_SELF_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        details: {},
      };

    case ACTION_TYPES.UPDATE_NICKNAME_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isUpdateNicknameSuccess: true,
      };
    case ACTION_TYPES.UPDATE_NICKNAME_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isUpdateNicknameSuccess: false,
      };

    case ACTION_TYPES.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isUpdatePasswordSuccess: true,
      };
    case ACTION_TYPES.UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        isUpdatePasswordSuccess: false,
      };

    case ACTION_TYPES.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        details: payload,
      };
    case ACTION_TYPES.GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        details: {},
      };

    case ACTION_TYPES.UPDATE_USER_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        details: payload,
      };
    case ACTION_TYPES.UPDATE_USER_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };

    case ACTION_TYPES.UPDATE_USER_TYPE_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        details: payload,
      };
    case ACTION_TYPES.UPDATE_USER_TYPE_FAILURE:
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
