import { Router } from "express";
import * as forumReplyController from "../controllers/forum.reply.controller";
import {
  bodyEmptyValidation,
  errorValidator,
  paramEmptyValidation,
  paramUUIDValidation,
} from "../middlewares/validator.middleware";
import { isDoctor } from "../middlewares/role.middleware";

const router = Router();
router.get(
  "/:forumCommentId",
  paramEmptyValidation(["forumCommentId"]),
  paramUUIDValidation(["forumCommentId"]),
  errorValidator,
  forumReplyController.getAllForumReplies
);

router.post(
  "/create",
  isDoctor,
  bodyEmptyValidation(["forumCommentId", "reply"]),
  errorValidator,
  forumReplyController.createForumReplies
);

export default router;
