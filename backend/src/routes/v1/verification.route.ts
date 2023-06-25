import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import {
  verificationValidation,
  verificationController,
} from "../../modules/verification";
import { multer } from "../../utils";

const router: Router = express.Router();


router.put(
  "/approve/:userId",
  [auth("manageIDCards")],
  [validate(verificationValidation.actionIDCard)],
  verificationController.approvedIDCards
);

router.put(
  "/deny/:userId",
  [auth("manageIDCards")],
  [validate(verificationValidation.actionIDCard)],
  verificationController.deniedIDCards
);

router.post(
  "/uploadIdCard",
  [auth("selfUpdate")],
  [
    validate(verificationValidation.uploadIDCards),
    multer.fields([
      { name: "frontImage" },
      { name: "backImage" },
      { name: "selfieImage" },
    ]),
  ],
  verificationController.uploadIDCards
);

router.get(
  "/",
  [auth("manageIDCards")],
  [validate(verificationValidation.fetchVerifications)],
  verificationController.fetchAllVerifications
);

export default router;
