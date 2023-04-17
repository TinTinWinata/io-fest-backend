import { Router } from "express";
import * as activationLinkController from "../controllers/activation.link.controller";

const router = Router();

router.post("/:id", activationLinkController.verifyUser);

export default router;
