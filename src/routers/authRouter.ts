import express, {Router} from "express";
import * as authController from "../controllers/authController";

export default (router: express.Router) => {
  router.post("/auth/login", authController.login);
  router.post("/auth/register", authController.register);
};
