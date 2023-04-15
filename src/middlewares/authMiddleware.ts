import express from "express";
import jwt from "jsonwebtoken";

export const JWT_SECRET: string = "REJTJSGANTENGBANGET";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //   try {
  //     const token = req.cookies.access_token;
  //     if (!token) {
  //       return res.sendStatus(403);
  //     }
  //     try {
  //       const data = jwt.verify(token, "YOUR_SECRET_KEY");
  //       return next();
  //     } catch {
  //       return res.sendStatus(403);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return res.sendStatus(400);
  //   }
};
