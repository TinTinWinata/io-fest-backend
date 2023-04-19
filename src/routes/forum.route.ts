import { NextFunction, Request, Response, Router } from "express";
import * as forumController from "../controllers/forum.controller";
import { bodyEmptyValidation, errorValidator } from "../facades/validator";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { uploadForum } from "../middlewares/file.upload.middleware";

const router = Router();

router.get("/", forumController.forumPagination);
router.post(
  "/create-forum",
  uploadForum,
  bodyEmptyValidation(["title", "description"]),
  errorValidator,
  forumController.createForum
);

export default router;
