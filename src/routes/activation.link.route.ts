import { Router } from "express";
import * as activationLinkController from "../controllers/activation.link.controller";
import { errorValidator, paramUUIDValidation } from "../facades/validator";

const router = Router();

router.patch(
  "/:id",
  paramUUIDValidation(["id"]),
  errorValidator,
  activationLinkController.verifyUser
);

router.post(
  "/generate/:id",
  paramUUIDValidation(["id"]),
  errorValidator,
  activationLinkController.generateActivationLink
);

export default router;
