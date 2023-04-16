import express from "express";
import activationLinkRouter from "./activationLinkRouter";
import authRouter from "./authRouter";
import userRouter from "./userRouter";

const router = express.Router();

export default (): express.Router => {
  authRouter(router);
  userRouter(router);
  activationLinkRouter(router);
  return router;
};
