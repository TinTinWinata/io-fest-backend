import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { errorValidator, paramUUIDValidation } from "../facades/validator";

const router = Router();

router.get(
  "/:id",
  paramUUIDValidation(["id"]),
  errorValidator,
  isAuthenticated,
  userController.getUserById
);

export default router;
