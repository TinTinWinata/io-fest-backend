import express from "express";
import * as userController from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";

export default (router: express.Router) => {
  router.get("/user/:id", isAuthenticated, userController.getUserById);
};
