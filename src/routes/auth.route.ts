import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import {
  errorValidator,
  bodyEmptyValidation,
  bodyEmailValidation,
  bodyLengthValidation,
  cookieEmptyValidation,
} from "../facades/validator";

const router = Router();

router.post(
  "/login",
  bodyEmptyValidation(["email", "password"]),
  bodyEmailValidation(["email"]),
  errorValidator,
  authController.login
);
router.post(
  "/register",
  bodyEmptyValidation(["email", "name", "username", "password"]),
  bodyEmailValidation(["email"]),
  bodyLengthValidation(["password"], [8], [16]),
  errorValidator,
  authController.register
);
router.delete(
  "/logout",
  cookieEmptyValidation(["refreshToken"]),
  errorValidator,
  authController.logout
);
router.get(
  "/token",
  cookieEmptyValidation(["refreshToken"]),
  errorValidator,
  authController.refreshToken
);

export default router;
