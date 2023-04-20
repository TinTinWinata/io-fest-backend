import express, { Router } from "express";
import path from "path";

const router = Router();

router.use(
  "/profile-picture",
  express.static(path.join(__dirname, "..", "public", "profilePicture"))
);
router.use(
  "/forum",
  express.static(path.join(__dirname, "..", "public", "forum"))
);

export default router;
