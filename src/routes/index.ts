import { Router } from "express";
import activationLinkRouter from "./activation.link.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/activation-link", activationLinkRouter);

export default router;
