import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import { chatBoxController, chatBoxValidation } from "../../modules/chatBox";

const router: Router = express.Router();

router.get(
  "/:roomId",
  auth("chatRoom"),
  validate(chatBoxValidation.getRoomById),
  chatBoxController.getChatBoxById
);

router.get("/", auth("chatRoom"), chatBoxController.getChatBoxes);

export default router;
