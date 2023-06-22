import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import {
  transactionController,
  transactionValidation,
} from "../../modules/transaction";

const router: Router = express.Router();

router.put(
  "/recharge/:transactionId",
  auth("actionMoney"),
  validate(transactionValidation.actionMoney),
  transactionController.rechangeMoney
);

router.put(
  "/withdraw/:transactionId",
  auth("actionMoney"),
  validate(transactionValidation.actionMoney),
  transactionController.withdrawMoney
);

router.post(
  "/request/withdraw",
  auth("requestMoney"),
  validate(transactionValidation.requestMoney),
  transactionController.requestWithdrawMoney
);

router.post(
  "/request/recharge",
  auth("requestMoney"),
  validate(transactionValidation.rechargeMoney),
  transactionController.requestRechangeMoney
);

router.put(
  "/cancel/:transactionId",
  auth("cancelTransaction"),
  validate(transactionValidation.updateTransaction),
  transactionController.cancelTransaction
);

router.put(
  "/deny/:transactionId",
  auth("denyTransaction"),
  validate(transactionValidation.updateTransaction),
  transactionController.denyTransaction
);

router.get(
  "/",
  auth("fetchTransactions"),
  validate(transactionValidation.fetchTransactions),
  transactionController.fetchTransactions
);

export default router;
