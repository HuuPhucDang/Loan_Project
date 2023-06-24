import * as AuthAPI from './Auth.api';
import * as BankAPI from './Bank.api';
import * as UserAPI from './User.api';
import * as VerificationAPI from './Verification.api';
import * as SystemInfoAPI from './SystemInfo';
import * as UserRequestAPI from './UserRequest.api';
import * as EmployeeAPI from './Employee.api';
import * as TransactionAPI from './Transaction.api';

export default {
  ...AuthAPI,
  ...BankAPI,
  ...UserAPI,
  ...VerificationAPI,
  ...SystemInfoAPI,
  ...UserRequestAPI,
  ...EmployeeAPI,
  ...TransactionAPI,
};
