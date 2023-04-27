import { Router } from "express";
import * as activationLinkController from "../controllers/activation.link.controller";
import {
  bodyEmptyValidation,
  bodyUUIDValidation,
  errorValidator,
} from "../middlewares/validator.middleware";

const router = Router();

router.patch(
  "/activate",
  bodyEmptyValidation(["activationLinkId"]),
  bodyUUIDValidation(["activationLinkId"]),
  errorValidator,
  activationLinkController.activateUser
);

router.post(
  "/generate",
  bodyEmptyValidation(["userId", "activationLinkId"]),
  bodyUUIDValidation(["userId", "activationLinkId"]),
  errorValidator,
  activationLinkController.generateActivationLink
);

export default router;
