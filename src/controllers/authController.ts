import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import {
  getUserByEmail,
  getUserByUsername,
  updateRefreshToken,
} from "../databases/userDatabase";
import { createUser } from "../databases/userDatabase";
import {
  accessTokenSecret,
  refreshTokenSecret,
} from "../middlewares/authMiddleware";
import { sendEmail } from "../helpers/helper";
import { createActivationLink } from "../databases/activationLinkDatabase";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    var user = await getUserByEmail(email);

    if (!user) {
      return res.sendStatus(400);
    }

    const match = await compare(password, user.password);

    if (!match) {
      return res.sendStatus(403);
    }

    if (!user.isActive) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      accessTokenSecret,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      refreshTokenSecret,
      {
        expiresIn: "15m",
      }
    );

    user = await updateRefreshToken(user.id, refreshToken);

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: user, accessToken: accessToken })
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
      id: uuidv4(),
      isActive: false,
      profilePicture: "",
      refreshToken: "",
    });

    const activationLink = await createActivationLink({
      id: uuidv4(),
      userId: user.id,
      expirationDate: new Date(Date.now() + 3600 * 1000 * 2),
    });

    await sendEmail(email, activationLink.id);

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
