import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import WidgetReducer from './Widget.reducer';
import AuthReducer from './Auth.reducer';
import BankReducer from './Bank.reducer';
import SecurityReducer from './Security.reducer';
import UserReducer from './User.reducer';
import VerificationReducer from './Verification.reducer';
import BinanceReducer from './Binance.reducer';
import ChatBoxReducer from './ChatBox.reducer';
import SystemInfoReducer from './SystemInfo.reducer';
import TransactionReducer from './Transaction.reducer';
import UserRequestReducer from './UserRequest.reducer';
import TradeReducer from './Trade.reducer';
import NotificationReducer from './Notification.reducer';

const createRootReducer = (history: History) =>
  combineReducers({
    ROUTER: connectRouter(history),
    WIDGET: WidgetReducer,
    AUTH: AuthReducer,
    BANK: BankReducer,
    SECURITY: SecurityReducer,
    USER: UserReducer,
    VERIFICATION: VerificationReducer,
    BINANCE: BinanceReducer,
    CHAT_BOX: ChatBoxReducer,
    SYSTEM_INFO: SystemInfoReducer,
    TRANSACTION: TransactionReducer,
    USER_REQUEST: UserRequestReducer,
    TRADE: TradeReducer,
    NOTIFICATION: NotificationReducer,
  });
export default createRootReducer;
