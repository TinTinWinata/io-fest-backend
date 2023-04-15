import express from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";

const router = express.Router();

export default (): express.Router => {
    authRouter(router);
    userRouter(router);
    return router;
}