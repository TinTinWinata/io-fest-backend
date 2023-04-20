import { NextFunction, Request, Response } from "express";

export const isMember = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role: string = req.jwtPayload.role;

    if (!role) {
      return res.status(400).json({ errors: ["error occurred!"] });
    }

    if (role === "Member") {
      return next();
    }

    return res.status(400).json({ errors: ["your role is not member!"] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const isDoctor = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role: string = req.jwtPayload.role;

    if (!role) {
      return res.status(400).json({ errors: ["error occurred!"] });
    }

    if (role === "Doctor") {
      return next();
    }

    return res.status(400).json({ errors: ["your role is not doctor!"] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role: string = req.jwtPayload.role;

    if (!role) {
      return res.status(400).json({ errors: ["error occurred!"] });
    }

    if (role === "Admin") {
      return next();
    }

    return res.status(400).json({ errors: ["your role is not admin!"] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};
