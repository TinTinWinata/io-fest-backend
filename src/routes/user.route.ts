import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  bodyEmptyValidation,
  errorValidator,
  paramUUIDValidation,
} from "../facades/validator";
import { uploadProfilePicture } from "../middlewares/file.upload.middleware";
import { isAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/:id",
  isAuthenticated,
  paramUUIDValidation(["id"]),
  errorValidator,
  userController.getUserById
);

router.patch(
  "/update-profile",
  isAuthenticated,
  bodyEmptyValidation(["username", "name"]),
  errorValidator,
  userController.updateProfile
);

router.patch(
  "/update-profile-picture",
  isAuthenticated,
  uploadProfilePicture,
  bodyEmptyValidation(["profilePicture"]),
  errorValidator,
  userController.updateProfilePicture
);

router.patch(
  "/change-role-doctor/:id",
  isAuthenticated,
  isAdmin,
  paramUUIDValidation(["id"]),
  userController.changeRole,
  errorValidator
);

export default router;
