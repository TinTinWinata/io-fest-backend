import { Request, Response, NextFunction } from "express";
import jwt, { Jwt, JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";

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
      return res.status(401).json({ errors: ["token not found!"] });
    }
    jwt.verify(
      token,
      accessTokenSecret,
      (
        err: VerifyErrors | null,
        decode: Jwt | JwtPayload | string | undefined
      ) => {
        if (err) {
          return res.status(400).json({ errors: [err.message] });
        }
        if (decode) {
          //   if (typeof decode !== "string") {
          //     // @ts-ignore
          //     req.user = decode;
          //   }
          return next();
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};
