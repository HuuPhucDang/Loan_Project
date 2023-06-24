import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
  employees: [],
};

export default (
  state = DEFAULT_STATES,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_EMPLOYEE_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }
    case ACTION_TYPES.RESET_EMPLOYEE_REDUCER:
      return DEFAULT_STATES;

    case ACTION_TYPES.FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        employees: payload,
      };
    case ACTION_TYPES.FETCH_EMPLOYEE_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        employees: [],
      };

    case ACTION_TYPES.UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };

    case ACTION_TYPES.UPDATE_LIST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        employees: payload,
      };
    case ACTION_TYPES.UPDATE_LIST_EMPLOYEE_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        employees: [],
      };

    default:
      return state;
  }
};
