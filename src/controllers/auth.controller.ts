import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import jwt, { Jwt, JwtPayload, VerifyErrors } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createActivationLink } from "../databases/activation.link.database";
import {
  clearRefreshToken,
  createUser,
  getUserByEmail,
  getUserByRefreshToken,
  getUserByUsername,
  updateRefreshToken,
} from "../databases/user.database";
import { sendEmail } from "../facades/helper";
import { accessTokenSecret, refreshTokenSecret } from "../utils/constants";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ errors: ["email not found!"] });
    }
    const match = await compare(password, user.password);
    if (!match) {
      return res.status(403).json({ errors: ["wrong credentials!"] });
    }
    if (!user.isActive) {
      return res
        .status(403)
        .json({ errors: ["please verify your account before proceeding!"] });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      accessTokenSecret,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      refreshTokenSecret,
      {
        expiresIn: "1d",
      }
    );

    const user2 = await updateRefreshToken(user.id, refreshToken);

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: user2, accessToken: accessToken });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, username, password } = req.body;

    const validateEmail = await getUserByEmail(email);
    const validateUsername = await getUserByUsername(username);

    if (validateEmail) {
      return res.status(400).json({ errors: ["email you provided is taken!"] });
    }

    if (validateUsername) {
      return res
        .status(400)
        .json({ errors: ["username you provided is taken!"] });
    }

    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    const user = await createUser({
      id: uuidv4(),
      email: email,
      username: username,
      name: name,
      password: hashedPassword,
      role: "Member",
      isActive: false,
      profilePicture: "/profile.webp",
      refreshToken: "",
    });

    const activationLink = await createActivationLink({
      id: uuidv4(),
      userId: user.id,
      expirationDate: new Date(Date.now() + 3600 * 1000 * 2),
    });

    await sendEmail(email, activationLink.id);

    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const user = await getUserByRefreshToken(refreshToken);

    if (!user) {
      return res.status(403).json({ errors: ["user not found!"] });
    }

    jwt.verify(
      refreshToken,
      refreshTokenSecret,
      (
        err: VerifyErrors | null,
        decode: Jwt | JwtPayload | string | undefined
      ) => {
        if (err) {
          return res.status(400).json({ errors: [err.message] });
        }
        if (decode) {
          const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            accessTokenSecret,
            {
              expiresIn: "15m",
            }
          );
          res.status(200).json({ accessToken: accessToken });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const user = await getUserByRefreshToken(refreshToken);

    if (!user) {
      return res.status(403).json({ errors: ["user not found!"] });
    }

    await clearRefreshToken(user.id);

    return res
      .status(200)
      .clearCookie("refreshToken")
      .json({ successes: ["logout successful!"] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};
