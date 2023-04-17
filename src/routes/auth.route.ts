import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import {
  bodyValidator,
  emailValidation,
  emptyValidation,
  lengthValidation,
} from "../facades/validator";

const router = Router();

router.post(
  "/login",
  emptyValidation(["email", "password"]),
  emailValidation(["email"]),
  lengthValidation(["password"], [8], [16]),
  bodyValidator,
  authController.login
);
router.post("/register", authController.register);
router.delete("/logout", authController.logout);
router.get("/token", authController.refreshToken);

export default router;
