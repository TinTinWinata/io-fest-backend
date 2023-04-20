import { Router } from "express";
import * as forumController from "../controllers/forum.controller";
import {
  bodyEmptyValidation,
  errorValidator,
  paramUUIDValidation,
} from "../facades/validator";
import { uploadForum } from "../middlewares/file.upload.middleware";

const router = Router();

router.get("/newest", forumController.newestForumPagination);
router.get("/top", forumController.topForumPagination);
router.post(
  "/create-forum",
  uploadForum,
  bodyEmptyValidation(["title", "description"]),
  errorValidator,
  forumController.createForum
);

router.patch(
  "/seen/:forumId",
  errorValidator,
  paramUUIDValidation(["forumId"]),
  forumController.forumSeen
);

// router.patch("/update-forum");

export default router;
