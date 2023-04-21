import { Router } from "express";
import * as forumCommentController from "../controllers/forum.comment.controller";
import {
  bodyEmptyValidation,
  errorValidator,
  paramEmptyValidation,
  paramUUIDValidation,
} from "../middlewares/validator.middleware";
import { isDoctor } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/:forumId",
  paramEmptyValidation(["forumId"]),
  paramUUIDValidation(["forumId"]),
  errorValidator,
  forumCommentController.getAllForumComments
);

router.post(
  "/create",
  isDoctor,
  bodyEmptyValidation(["forumId", "comment"]),
  errorValidator,
  forumCommentController.createForumComment
);

export default router;
