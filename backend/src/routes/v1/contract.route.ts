import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import {
  contractTemplateValidation,
  contractTemplateController,
} from "../../modules/contractTemplate";

const router: Router = express.Router();

router
  .put(
    "/template/:inforId",
    [auth("updateSystemInfor")],
    [validate(contractTemplateValidation.updateTemplate)],
    contractTemplateController.updateTemplate
  )
  .get("/template", contractTemplateController.getSystemInfor);

router.get(
  "/preview",
  [auth("previewContract")],
  [validate(contractTemplateValidation.previewContract)],
  contractTemplateController.previewContract
);

export default router;
