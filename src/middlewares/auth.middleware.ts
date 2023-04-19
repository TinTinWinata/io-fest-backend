import { Request, Response, NextFunction } from "express";
import jwt, { Jwt, JwtPayload, VerifyErrors } from "jsonwebtoken";
import { accessTokenSecret } from "../utils/constants";

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
          req.jwtPayload = decode;
          return next();
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};
