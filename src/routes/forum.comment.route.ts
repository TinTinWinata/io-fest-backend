import { Router } from "express";
import * as forumCommentController from "../controllers/forum.comment.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isDoctor } from "../middlewares/role.middleware";
import {
  bodyEmptyValidation,
  errorValidator,
  paramEmptyValidation,
  paramUUIDValidation,
} from "../middlewares/validator.middleware";

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
  isAuthenticated,
  isDoctor,
  bodyEmptyValidation(["forumId", "comment"]),
  errorValidator,
  forumCommentController.createForumComment
);

export default router;
