import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import { tradeController, tradeValidation } from "../../modules/trade";

const router: Router = express.Router();

router.post(
  "/",
  auth("trade"),
  validate(tradeValidation.createNewTrade),
  tradeController.createNewTrade
);

router.get("/", auth("trade"), tradeController.fetchAllTrandes);

export default router;
