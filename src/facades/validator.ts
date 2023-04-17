import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const emptyValidation = (requests: string[]) => {
  return requests.map((req) => {
    return body(req, `${req} field cannot be empty!`).notEmpty();
  });
};

export const emailValidation = (requests: string[]) => {
  return requests.map((req) => {
    return body(
      req,
      `${req} field must be in the correct email format!`
    ).isEmail();
  });
};

export const lengthValidation = (
  requests: string[],
  min: number[],
  max: number[]
) => {
  return requests.map((req, i) => {
    return body(
      req,
      `${req} field must between ${min[i]} and ${max[i]}!`
    ).isLength({ min: min[i], max: max[i] });
  });
};

export const bodyValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    errors: errors.array().map((err) => {
      return err.msg;
    }),
  });
};
