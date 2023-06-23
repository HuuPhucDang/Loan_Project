import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import {
  userRequestController,
  userRequestValidation,
} from "../../modules/userRequest";

const router: Router = express.Router();

router.post(
  "/forgot_password",
  validate(userRequestValidation.requestForgotPassword),
  userRequestController.requestForgotPassword
);

router.get(
  "/",
  auth("fetchUserRequests"),
  validate(userRequestValidation.fetchUserRequests),
  userRequestController.fetchUserRequests
);

export default router;
