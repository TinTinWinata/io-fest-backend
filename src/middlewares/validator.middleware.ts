import { NextFunction, Request, Response } from "express";
import {
  body,
  cookie,
  validationResult,
  param,
  query,
} from "express-validator";

export const bodyEmptyValidation = (requests: string[]) => {
  return requests.map((req) => {
    return body(req, `${req} field cannot be empty!`).notEmpty();
  });
};

export const bodyEmailValidation = (requests: string[]) => {
  return requests.map((req) => {
    return body(
      req,
      `${req} field must be in the correct email format!`
    ).isEmail();
  });
};

export const bodyUUIDValidation = (requests: string[]) => {
  return requests.map((req) => {
    return body(
      req,
      `${req} body must be in the correct uuid(v4) format!`
    ).isUUID(4);
  });
};

export const bodyLengthValidation = (
  requests: string[],
  min: number[],
  max: number[]
) => {
  return requests.map((req, i) => {
    return body(
      req,
      `${req} field must between ${min[i]} and ${max[i]} character(s)!`
    ).isLength({ min: min[i], max: max[i] });
  });
};

export const queryEmptyValidation = (requests: string[]) => {
  return requests.map((req) => {
    return query(req, `${req} query not found`).notEmpty();
  });
};

export const cookieEmptyValidation = (requests: string[]) => {
  return requests.map((req) => {
    return cookie(req, `${req} cookie not found!`).exists();
  });
};

export const paramEmptyValidation = (requests: string[]) => {
  return requests.map((req) => {
    return param(
      req,
      `${req} param must be in the correct uuid(v4) format!`
    ).notEmpty();
  });
};

export const paramUUIDValidation = (requests: string[]) => {
  return requests.map((req) => {
    return param(
      req,
      `${req} param must be in the correct uuid(v4) format!`
    ).isUUID(4);
  });
};

export const errorValidator = (
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
