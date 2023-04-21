import { Router } from "express";
import activationLinkRouter from "./activation.link.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import forumRouter from "./forum.route";
import staticFileRouter from "./static.file.route";
import forumCommentRouter from "./forum.comment.route";
import forumReplyRouter from "./forum.reply.route";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.use("/users", isAuthenticated, userRouter);
router.use("/auth", authRouter);
router.use("/activation-links", activationLinkRouter);
router.use("/forums", isAuthenticated, forumRouter);
router.use("/forum-comments", isAuthenticated, forumCommentRouter);
router.use("/forum-replies", isAuthenticated, forumReplyRouter);
router.use("/public", isAuthenticated, staticFileRouter);

export default router;
