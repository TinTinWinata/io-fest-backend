import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import express, { Request, Response } from "express";
import { getUserByEmail, getUserByUsername } from "../databases/userDatabase";
import { createUser } from "../databases/userDatabase";
import { JWT_SECRET } from "../middlewares/authMiddleware";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.sendStatus(400);
    }

    const userPassword = await compare(password, user.password);

    if (!userPassword) {
      return res.sendStatus(403);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user: user, token: token })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, username, password } = req.body;

    if (!email || !name || !username || !password) {
      return res.sendStatus(400);
    }

    const validateEmail = await getUserByEmail(email);
    const validateUsername = await getUserByUsername(username);
    if (validateEmail || validateUsername) {
      return res.sendStatus(400);
    }

    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    const user = await createUser({
      email: email,
      username: username,
      name: name,
      password: hashedPassword,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
