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
      return res.status(401);
    }
    const decode = jwt.verify(token, accessTokenSecret);

    if (decode) {
      if (typeof decode !== "string") {
        // @ts-ignore
        req.user = decode;
      }
    } else {
      return res.send(401);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
