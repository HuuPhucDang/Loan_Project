import * as AuthAPI from './Auth.api';
import * as BankAPI from './Bank.api';
import * as SecurityAPI from './Security.api';
import * as UserAPI from './User.api';
import * as VerificationAPI from './Verification.api';
import * as ChatBoxAPI from './ChatBox';
import * as SystemInfoAPI from './SystemInfo';
import * as TransactionAPI from './Transaction.api';
import * as UserRequestAPI from './UserRequest.api';
import * as TradeAPI from './Trade.api';
import * as NotificationAPI from './Notification.api';

export default {
  ...AuthAPI,
  ...BankAPI,
  ...SecurityAPI,
  ...UserAPI,
  ...VerificationAPI,
  ...ChatBoxAPI,
  ...SystemInfoAPI,
  ...TransactionAPI,
  ...UserRequestAPI,
  ...TradeAPI,
  ...NotificationAPI,
};
