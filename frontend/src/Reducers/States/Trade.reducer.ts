import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
  allTrades: [],
  requestHasError: false,
  requestIsSuccess: false,
};

export default (
  state = DEFAULT_STATES,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_TRADE_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }
    case ACTION_TYPES.SET_TRADE_FETCH_LOADING: {
      return {
        ...state,
        isFetchLoading: payload,
      };
    }
    case ACTION_TYPES.RESET_TRADE_REDUCER: {
      return DEFAULT_STATES;
    }

    case ACTION_TYPES.FETCH_TRADE_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isFetchLoading: false,
        allTrades: payload,
      };
    case ACTION_TYPES.FETCH_TRADE_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isFetchLoading: false,
      };

    case ACTION_TYPES.CREATE_TRADE_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        allTrades: [payload, ...state.allTrades],
      };
    case ACTION_TYPES.CREATE_TRADE_FAILURE:
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
