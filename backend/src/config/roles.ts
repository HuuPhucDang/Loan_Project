const BASIC_ROLES = [
  "selfUpdate",
  "requestMoney",
  "cancelTransaction",
  "fetchTransactions",
];

const allRoles = {
  user: [...BASIC_ROLES],
  admin: [
    ...BASIC_ROLES,
    "getUser",
    "manageUsers",
    "actionMoney",
    "denyTransaction",
    "manageIDCards",
  ],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(
  Object.entries(allRoles)
);
