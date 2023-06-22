const assignReturnUser = (user: any) => {
  if (user?.bank?.accountNumber)
    user.bank.accountNumber = user.bank.accountNumber.replace(
      /^\d{1,8}/,
      "********"
    );
  if (user?.security?.phonenumber) {
    user.security.phonenumber = user.security.phonenumber.replace(
      /^\d{1,8}/,
      "********"
    );
  }
  if (user?.security?.email) {
    user.security.email = user.security.email.replace(
      /(\w{3})[\w.-]+@([\w.]+\w)/,
      "$1***@$2"
    );
  }
  return user;
};

export default assignReturnUser;
