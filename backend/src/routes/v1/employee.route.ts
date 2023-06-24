import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import { employeeValidation, employeeController } from "../../modules/employee";

const router: Router = express.Router();

router.get("/", [auth("manageEmployee")], employeeController.getAllEmployee);
router.post(
  "/",
  [auth("manageEmployee")],
  [validate(employeeValidation.createEmployee)],
  employeeController.createEmployee
);
router.put(
  "/:employeeId",
  [auth("manageEmployee")],
  [validate(employeeValidation.updateEmployee)],
  employeeController.updateEmployee
);
router.put(
  "/",
  [auth("manageEmployee")],
  [validate(employeeValidation.updateContactList)],
  employeeController.updateContactList
);
router.get(
  "/support",
  [auth("getSupporter")],
  employeeController.getSupportEmployee
);
export default router;
