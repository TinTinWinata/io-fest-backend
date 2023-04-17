import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:id", isAuthenticated, userController.getUserById);

export default router;
