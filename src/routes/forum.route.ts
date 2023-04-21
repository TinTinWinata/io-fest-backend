import { Router } from "express";
import * as forumController from "../controllers/forum.controller";
import {
  bodyEmptyValidation,
  bodyUUIDValidation,
  errorValidator,
  paramEmptyValidation,
  paramUUIDValidation,
} from "../middlewares/validator.middleware";
import { uploadForum } from "../middlewares/file.upload.middleware";
import { isForumCreator } from "../middlewares/forum.middleware";

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
  bodyEmptyValidation(["forumId", "title", "description"]),
  bodyUUIDValidation(["forumId"]),
  errorValidator,
  isForumCreator,
  forumController.updateForum
);

router.delete(
  "/delete",
  bodyEmptyValidation(["forumId"]),
  bodyUUIDValidation(["forumId"]),
  errorValidator,
  isForumCreator,
  forumController.deleteForum
);

export default router;
