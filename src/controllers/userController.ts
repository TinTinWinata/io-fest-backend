import express, { Request, Response } from "express";
import {
  getUserByID as getUser,
  createUser as cUser,
} from "../databases/userDatabase";
import { User } from "../models/model";

export const getUserByID = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user = await getUser(id);
  if (user) {
    return res.send(user);
  }
  return res.sendStatus(404).send({ message: "user not found" });
};

export const createUser = async (req: Request, res: Response) => {
  const user: User = {
    email: req.body.email,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
  const createdUser = await cUser(user);

  if (createdUser) {
    return res.send(createdUser);
  }
  return res.sendStatus(400).send({ message: "error occured" });
};
