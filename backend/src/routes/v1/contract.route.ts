import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import {
  contractTemplateValidation,
  contractTemplateController,
} from "../../modules/contractTemplate";
import { multer } from "../../utils";
import { contractValidation, contractController } from "../../modules/contract";

const router: Router = express.Router();

router.get("/", [auth("manageContract")], contractController.fetchAllContracts);
router.post(
  "/",
  [auth("createContract")],
  [
    validate(contractValidation.uploadIDCards),
    multer.fields([
      { name: "frontImage" },
      { name: "backImage" },
      { name: "selfieImage" },
      { name: "signImage" },
    ]),
  ],
  contractController.createContract
);
router.put(
  "/:contractId",
  [auth("manageContract")],
  [
    validate(contractValidation.updateContract),
  ],
  contractController.updateContract
);
router.put(
  "/deny/:contractId",
  [auth("manageContract")],
  [validate(contractValidation.actionIDCard)],
  contractController.deniedContract
);
router.put(
  "/approve/:contractId",
  [auth("manageContract")],
  [validate(contractValidation.actionIDCard)],
  contractController.approvedContract
);
router.put(
  "/complete/:contractId",
  [auth("manageContract")],
  [validate(contractValidation.actionIDCard)],
  contractController.completeContract
);

router
  .put(
    "/template/:contractId",
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
