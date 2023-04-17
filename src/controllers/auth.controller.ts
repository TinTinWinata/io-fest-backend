import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import {
  clearRefreshToken,
  getUserByEmail,
  getUserByRefreshToken,
  getUserByUsername,
  updateRefreshToken,
} from "../databases/user.database";
import { createUser } from "../databases/user.database";
import {
  accessTokenSecret,
  refreshTokenSecret,
} from "../middlewares/auth.middleware";
import { sendEmail } from "../facades/helper";
import { createActivationLink } from "../databases/activation.link,database";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400);
    }

    var user = await getUserByEmail(email);

    if (!user) {
      return res.status(400);
    }

    const match = await compare(password, user.password);

    if (!match) {
      return res.status(403);
    }

    if (!user.isActive) {
      return res.status(403);
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
      .json({ user: user, accessToken: accessToken });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, username, password } = req.body;

    if (!email || !name || !username || !password) {
      return res.status(400);
    }

    const validateEmail = await getUserByEmail(email);
    const validateUsername = await getUserByUsername(username);
    if (validateEmail || validateUsername) {
      return res.status(400);
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

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401);
    }

    const user = await getUserByRefreshToken(refreshToken);

    if (!user) {
      return res.status(403);
    }

    const decode = jwt.verify(refreshToken, refreshTokenSecret);

    if (decode) {
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        accessTokenSecret,
        {
          expiresIn: "15m",
        }
      );

      res.status(200).json({ user: user, accessToken: accessToken });
    } else {
      return res.status(401);
    }
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401);
    }

    const user = await getUserByRefreshToken(refreshToken);

    if (!user) {
      return res.status(403);
    }
    await clearRefreshToken(user.id);

    res.clearCookie("refreshToken");

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
