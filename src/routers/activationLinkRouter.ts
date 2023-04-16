import express, { Router } from "express";
import * as activationLinkController from "../controllers/activationLinkController";

export default (router: express.Router) => {
  router.post("/activation/:id", activationLinkController.verifyUser);
};
