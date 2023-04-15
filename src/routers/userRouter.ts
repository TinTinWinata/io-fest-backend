import express from "express";
import * as userController from "../controllers/userController";

export default (router: express.Router) => {
  router.get("/user/:id", userController.getUserByID);
  router.post("/createUser", userController.createUser);
};
