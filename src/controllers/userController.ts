import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getUserById as getUser,
  createUser as cUser,
} from "../databases/userDatabase";
import { User } from "@prisma/client";

export const getUserById = async (req: Request, res: Response) => {
  console.log(req.body.id);
  console.log(req.body.email);
  const id: string = req.params.id;
  const user = await getUser(id);
  if (user) {
    return res.status(200).json(user).end();
  }
  return res.sendStatus(404).send({ message: "user not found" });
};

export const createUser = async (req: Request, res: Response) => {
  const user: User = {
    id: uuidv4(),
    email: req.body.email,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    isActive: false,
    profilePicture: "",
    refreshToken: "",
  };
  const createdUser = await cUser(user);

  if (createdUser) {
    return res.status(200).json(createdUser).end();
  }
  return res.sendStatus(400).send({ message: "error occured" });
};
