import { Request, Response } from "express";
import {
  getUserById as getUser,
} from "../databases/user.database";

export const getUserById = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user = await getUser(id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(400).json({ errors: ["user not found"] });
};