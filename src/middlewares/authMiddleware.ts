import express, { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

export const JWT_SECRET: Secret = "REJTJSGANTENGBANGET";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.body.user = data.toString();
      console.log(data.toString());
      return next();
    } catch {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
