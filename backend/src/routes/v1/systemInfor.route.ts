import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import {
  systemInforValidation,
  systemInforController,
} from "../../modules/systemInfor";
import { multer } from "../../utils";

const router: Router = express.Router();

router
  .post(
    "/:inforId",
      multer.single("QRCode"),
    [auth("updateSystemInfor")],
    [
      validate(systemInforValidation.updateSystemInfor),
    ],
    systemInforController.updateSystemInfor
  )
  .get("/", systemInforController.getSystemInfor);

export default router;
