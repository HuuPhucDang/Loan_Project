import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import { userController, userValidation } from "../../modules/user";

const router: Router = express.Router();

router.put(
  "/avatar",
  auth("selfUpdate"),
  validate(userValidation.updateUserAvavtar),
  userController.updateUserAvatar
);

router.put(
  "/nickname",
  auth("selfUpdate"),
  validate(userValidation.updateUserNickname),
  userController.updateUserNickname
);

router.put(
  "/userType/:userId",
  auth("manageUsers"),
  validate(userValidation.updateUserType),
  userController.updateUserType
);

router.get("/self", auth("selfUpdate"), userController.getSelf);

router
  .route("/")
  .post(
    auth("manageUsers"),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(
    auth("manageUsers"),
    validate(userValidation.getUsers),
    userController.getUsers
  );

router
  .route("/:userId")
  .get(
    auth("getUser"),
    validate(userValidation.getUser),
    userController.getUser
  )
  .put(
    auth("manageUsers"),
    validate(userValidation.updateUser),
    userController.updateUser
  );

export default router;
