import { Router } from "express";
import * as forumController from "../controllers/forum.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { uploadForum } from "../middlewares/file.upload.middleware";
import { isForumCreator } from "../middlewares/forum.middleware";
import {
  bodyEmptyValidation,
  bodyUUIDValidation,
  errorValidator,
  paramEmptyValidation,
  paramUUIDValidation,
} from "../middlewares/validator.middleware";

const router = Router();

router.get("/newest", forumController.newestForumPagination);
router.get("/top", forumController.topForumPagination);

router.get(
  "/get/:forumId",
  paramEmptyValidation(["forumId"]),
  paramUUIDValidation(["forumId"]),
  errorValidator,
  forumController.getForum
);

router.post(
  "/create",
  isAuthenticated,
  uploadForum,
  bodyEmptyValidation(["title", "description"]),
  errorValidator,
  forumController.createForum
);

router.patch(
  "/seen",
  bodyEmptyValidation(["forumId"]),
  bodyUUIDValidation(["forumId"]),
  errorValidator,
  isForumCreator,
  forumController.forumSeen
);

router.patch(
  "/update",
  isAuthenticated,
  bodyEmptyValidation(["forumId", "title", "description"]),
  bodyUUIDValidation(["forumId"]),
  errorValidator,
  isForumCreator,
  forumController.updateForum
);

router.delete(
  "/delete",
  isAuthenticated,
  bodyEmptyValidation(["forumId"]),
  bodyUUIDValidation(["forumId"]),
  errorValidator,
  isForumCreator,
  forumController.deleteForum
);

export default router;
