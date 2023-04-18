import { Router } from "express";
import * as forumController from "../controllers/forum.controller";
import {
  bodyEmptyValidation,
  bodyUUIDValidation,
  errorValidator,
} from "../facades/validator";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { uploadForum } from "../middlewares/file.upload.middleware";

const router = Router();

// router.get("/", isAuthenticated);
router.post(
  "/create-forum",
  isAuthenticated,
  uploadForum.array("forumAttachment", 8),
  bodyEmptyValidation(["title", "description"]),
  errorValidator,
  forumController.createForum
);

export default router;
