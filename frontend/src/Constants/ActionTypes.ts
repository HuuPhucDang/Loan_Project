interface ActionTypes {
  [key: string]: string;
}

const generateSyncActions = (actionList: string[]) => {
  const map: { [key: string]: string } = {};
  actionList.map((action) => {
    const name = action.trim();
    if (name !== '') {
      map[`${name}_SUCCESS`] = `${name}_SUCCESS`;
      map[`${name}_FAILURE`] = `${name}_FAILURE`;
    }
  });
  return map;
};

const generateLoadingActions = (actionList: string[]) => {
  const map: { [key: string]: string } = {};
  actionList.map((action) => {
    const name = action.trim();
    if (name !== '') {
      map[`SET_${name}_FETCH_LOADING`] = `SET_${name}_FETCH_LOADING`;
      map[`SET_${name}_GET_LOADING`] = `SET_${name}_GET_LOADING`;
      map[`SET_${name}_ACTION_LOADING`] = `SET_${name}_ACTION_LOADING`;
    }
  });
  return map;
};

const _loadingActions: ActionTypes = generateLoadingActions([
  'AUTH',
  'BLOG',
  'BANK',
  'SECURITY',
  'USER',
  'VERIFICATION',
  'BINANCE',
  'CHAT_BOX',
  'SYSTEM_INFO',
  'TRANSACTION',
  'USER_REQUEST',
  'TRADE',
  'NOTIFICATION',
]);

const _asyncActions: ActionTypes = generateSyncActions([
  'FETCH_LATEST_BLOG_LIST',
  'FETCH_BLOG_SECTION',
  'GET_BLOG_BY_ID',
  'LOGIN',
  'REGISTER',
  'UPDATE_NICKNAME',
  'ACTIVE_BANK_CARD',
  'CHANGE_PASSWORD',
  'VERIFY_PHONE_NUMBER',
  'ACTIVE_EMAIL',
  'CHANGE_EMAIL',
  'ACTIVE_WITHDRAW_PASSWORD',
  'CHANGE_WITHDRAW_PASSWORD',
  'UPDATE_AVATAR',
  'FETCH_USERS',
  'GET_SELF',
  'UPDATE_NICKNAME',
  'UPLOAD_CARDS_ID',
  'GET_SINGLE_PRICE',
  'GET_CANDLE_STICK',
  'GET_TOP_TEN_COUPLE_TICKERS',
  'GET_EXCHANGE',
  'FETCH_CHAT_BOX',
  'FETCH_CHAT_BOX_BY_ID',
  'GET_SYSTEM_INFO',
  'UPDATE_SYSTEM_INFO',
  'FETCH_TRANSACTIONS',
  'REQUEST_WITHDRAW',
  'REQUEST_RECHARGE',
  'RECHARGE_MONEY',
  'WITHDRAW_MONEY',
  'CANCEL_TRANSACTION',
  'DENY_TRANSACTION',
  'UPDATE_PASSWORD',
  'REQUEST_FORGOT_PASSWORD',
  'FETCH_USER_REQUESTS',
  'FETCH_ALL_VERIFICATION',
  'APPROVE_VERIFICATION',
  'DENY_VERIFICATION',
  'GET_USER_BY_ID',
  'UPDATE_USER_TYPE',
  'FETCH_TRADE',
  'CREATE_TRADE',
  'UPDATE_USER',
  'FETCH_NOTIFICATION',
]);

const _singleActions: ActionTypes = {
  // Auth actions
  LOG_OUT: 'LOG_OUT',
  SET_LOGGED: 'SET_LOGGED',
  RESET_AUTH_REDUCER: 'RESET_AUTH_REDUCER',
  // Widget actions
  SET_NOTIFICATION_MESSAGE: 'SET_NOTIFICATION_MESSAGE',
  SET_ALERT_MESSAGE: 'SET_ALERT_MESSAGE',
  // Blog actions
  SET_BLOG_PAGINATION: 'SET_BLOG_PAGINATION',
  SET_BLOG_META: 'SET_BLOG_META',
  RESET_BLOG_REDUCER: 'RESET_BLOG_REDUCER',
  // Bank actions
  RESET_BANK_REDUCER: 'RESET_BANK_REDUCER',
  // Security actions
  RESET_SECURITY_REDUCER: 'RESET_SECURITY_REDUCER',
  // User actions
  RESET_USER_REDUCER: 'RESET_USER_REDUCER',
  // Verification actions
  RESET_VERIFICATION_REDUCER: 'RESET_VERIFICATION_REDUCER',
  // Binance actions
  RESET_BINANCE_REDUCER: 'RESET_BINANCE_REDUCER',
  // Chat Box actions
  RESET_CHAT_BOX_REDUCER: 'RESET_CHAT_BOX_REDUCER',
  // System Info actions
  RESET_SYSTEM_INFO_REDUCER: 'RESET_SYSTEM_INFO_REDUCER',
  // Transaction actions
  RESET_TRANSACTION_REDUCER: 'RESET_TRANSACTION_REDUCER',
  // User Request actions
  RESET_USER_REQUEST_REDUCER: 'RESET_USER_REQUEST_REDUCER',
  // Trade action
  RESET_TRADE_REDUCER: 'RESET_TRADE_REDUCER',
  // Notification action
  RESET_NOTIFICATION_REDUCER: 'RESET_NOTIFICATION_REDUCER',
};

const ACTION_TYPES = {
  ..._asyncActions,
  ..._singleActions,
  ..._loadingActions,
};

export default ACTION_TYPES;
