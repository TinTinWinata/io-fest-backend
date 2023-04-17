import { Request, Response } from "express";
import {
  getUserById as getUser,
} from "../databases/user.database";

export const getUserById = async (req: Request, res: Response) => {
  // @ts-ignore
  console.log("id: " + req.user.id + ", email: " + req.user.email);
  const id: string = req.params.id;
  const user = await getUser(id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).send({ message: "user not found" });
};