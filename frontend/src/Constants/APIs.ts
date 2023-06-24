export default {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  USERS: {
    UPDATE_AVATAR: '/users/avatar',
    BASIC: '/users',
    GET_SELF: '/users/self',
    UPDATE_NICKNAME: '/users/nickname',
    UPDATE_USER_TYPE: '/users/userType',
  },
  SECURITY: {
    CHANGE_PASSWORD: '/security/changePassword',
    VERIFY_PHONE_NUMBER: '/security/phonenumber',
    ACTIVE_EMAIL: '/security/activeEmail',
    CHANGE_EMAIL: '/security/changeEmail',
    ACTIVE_WITHDRAW_PASSWORD: '/security/activeWithdrawPassword',
    CHANGE_WITHDRAW_PASSWORD: '/security/changeWithdrawPassword',
  },
  BANK: {
    ACTIVE_BANK_CARD: '/bank/active',
  },
  VERIFICATION: {
    BASIC: '/verification',
    APPROVE: '/verification/approve',
    DENY: '/verification/deny',
    UPLOAD_CARDS_ID: '/verification/uploadIdCard',
  },
  TRANSACTION: {
    BASIC: '/transactions',
    REQUEST_WITHDRAW: '/transactions/request/withdraw',
    REQUEST_RECHARGE: '/transactions/request/recharge',
    RECHARGE_MONEY: '/transactions/recharge',
    WITHDRAW_MONEY: '/transactions/withdraw',
    CANCEL_TRANSACTION: '/transactions/cancel',
    DENY_TRANSACTIOn: '/transactions/deny',
  },
  USER_REQUEST: {
    BASIC: '/requests',
    FORGOT_PASSWORD: '/requests/forgot_password',
  },
  SYSTEM_INFO: {
    BASIC: '/contract/template',
    FETCH: '/contract',
    DENY_CONTRACT: '/contract/deny',
    APPROVE_CONTRACT: '/contract/approve',
    COMPLETE_CONTRACT: '/contract/complete',
  },
  CHAT_BOX: {
    BASIC: '/chatBox',
  },
  TRADE: {
    BASIC: '/trade',
  },
  NOTIFICATION: {
    BASIC: '/notification',
  },
  EMPLOYEE: {
    BASIC: '/employee',
  },
};
