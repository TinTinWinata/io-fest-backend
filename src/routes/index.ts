import { Router } from "express";
import activationLinkRouter from "./activation.link.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import forumRouter from "./forum.route";
import staticFileRouter from "./static.file.route";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/activation-link", activationLinkRouter);
router.use("/forums", isAuthenticated, forumRouter);
router.use("/public", isAuthenticated, staticFileRouter);

export default router;