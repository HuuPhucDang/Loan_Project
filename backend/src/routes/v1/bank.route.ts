import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import { bankController, bankValidation } from "../../modules/bank";

const router: Router = express.Router();

router.put(
  "/active",
  auth("selfUpdate"),
  validate(bankValidation.activeBank),
  bankController.activeBank
);

export default router;
