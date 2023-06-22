import express, { Router } from "express";
import { auth } from "../../modules/auth";
import { notificationController } from "../../modules/notification";

const router: Router = express.Router();

router.get(
  "/",
  auth("notification"),
  notificationController.fetchUserNotifications
);

export default router;
