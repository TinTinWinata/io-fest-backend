import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import activationLinkRouter from "./activation.link.route";
import authRouter from "./auth.route";
import forumCommentRouter from "./forum.comment.route";
import forumReplyRouter from "./forum.reply.route";
import forumRouter from "./forum.route";
import staticFileRouter from "./static.file.route";
import userRouter from "./user.route";

const router = Router();

router.use("/users", isAuthenticated, userRouter);
router.use("/auth", authRouter);
router.use("/activation-links", activationLinkRouter);
router.use("/forums", forumRouter);
router.use("/forum-comments", forumCommentRouter);
router.use("/forum-replies", isAuthenticated, forumReplyRouter);
router.use("/public", staticFileRouter);

export default router;
