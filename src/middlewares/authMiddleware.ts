import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

export const accessTokenSecret: Secret =
  process.env.ACCESS_TOKEN_SECRET || "mbVBFoeO40bcE3AilczmnM7IcQY0xWQwsC7Hbuqu";
export const refreshTokenSecret: Secret =
  process.env.REFRESH_TOKEN_SECRET ||
  "CkwmqZBk2e8HPkwsxi0lbZrvqej7BYpmNmTvJZTL";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }
    try {
      const data = jwt.verify(token, accessTokenSecret);
      if (typeof data !== "string") {
        req.body.id = data.id;
        req.body.email = data.email;
      }
      next();
    } catch {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
