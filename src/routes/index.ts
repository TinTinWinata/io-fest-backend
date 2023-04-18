import { Router } from "express";
import activationLinkRouter from "./activation.link.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import forumRouter from "./forum.route";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/activation-link", activationLinkRouter);
router.use("/forums", forumRouter);

export default router;
