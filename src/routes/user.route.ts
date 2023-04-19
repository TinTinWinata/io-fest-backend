import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  bodyEmptyValidation,
  errorValidator,
  paramUUIDValidation,
} from "../facades/validator";
import { uploadProfilePicture } from "../middlewares/file.upload.middleware";

const router = Router();

router.get(
  "/:id",
  isAuthenticated,
  paramUUIDValidation(["id"]),
  errorValidator,
  userController.getUserById
);

router.patch(
  "/update-profile-picture",
  isAuthenticated,
  uploadProfilePicture,
  bodyEmptyValidation(["id", "profilePicture"]),
  userController.updateProfilePicture
);

export default router;
