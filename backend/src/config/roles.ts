const BASIC_ROLES = [
  "selfUpdate",
  "requestMoney",
  "cancelTransaction",
  "fetchTransactions",
  "chatRoom",
  "trade",
  "notification",
];

const allRoles = {
  user: [...BASIC_ROLES],
  admin: [
    ...BASIC_ROLES,
    "getUser",
    "manageUsers",
    "actionMoney",
    "denyTransaction",
    "fetchUserRequests",
    "updateSystemInfor",
    "manageIDCards",
  ],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(
  Object.entries(allRoles)
);
