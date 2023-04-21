import { Router } from "express";
import * as userController from "../controllers/user.controller";
import {
  bodyEmptyValidation,
  errorValidator,
  paramEmptyValidation,
  paramUUIDValidation,
} from "../middlewares/validator.middleware";
import { uploadProfilePicture } from "../middlewares/file.upload.middleware";
import { isAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/get/:id",
  paramEmptyValidation(["id"]),
  paramUUIDValidation(["id"]),
  errorValidator,
  userController.getUserById
);

router.patch(
  "/update-profile",
  bodyEmptyValidation(["username", "name"]),
  errorValidator,
  userController.updateProfile
);

router.patch(
  "/update-profile-picture",
  uploadProfilePicture,
  bodyEmptyValidation(["profilePicture"]),
  errorValidator,
  userController.updateProfilePicture
);

router.patch(
  "/change-role-doctor",
  isAdmin,
  bodyEmptyValidation(["userId"]),
  errorValidator,
  userController.changeRole
);

router.get("/admin-page", isAdmin, userController.adminPage);

export default router;
