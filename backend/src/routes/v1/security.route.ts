import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import { securityController, securityValidation } from "../../modules/secutiry";

const router: Router = express.Router();

router.put(
  "/phonenumber",
  auth("selfUpdate"),
  validate(securityValidation.verifyPhonenumber),
  securityController.verifyPhonenumber
);

router.put(
  "/activeEmail",
  auth("selfUpdate"),
  validate(securityValidation.activeUserEmail),
  securityController.activeUserEmail
);

router.put(
  "/changeEmail",
  auth("selfUpdate"),
  validate(securityValidation.changeUserEmail),
  securityController.changeUserEmail
);

router.put(
  "/activeWithdrawPassword",
  auth("selfUpdate"),
  validate(securityValidation.activeWithdrawPassword),
  securityController.activeWithdrawPassword
);

router.put(
  "/changeWithdrawPassword",
  auth("selfUpdate"),
  validate(securityValidation.changeWithdrawPassword),
  securityController.changeWithdrawPassword
);

router.put(
  "/changePassword",
  auth("selfUpdate"),
  validate(securityValidation.changeUserPassword),
  securityController.changeUserPassword
);

export default router;
