import { Request, Response } from "express";
import {
  getUserById as getUser,
  getUserByUsername,
  updateProfilePicture as uProfilePicture,
  updateProfile as uProfile,
  updateRoleDoctor,
} from "../databases/user.database";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const user = await getUser(id);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(400).json({ errors: ["user not found"] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const updateProfilePicture = async (req: Request, res: Response) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ errors: [req.fileValidationError] });
    }

    const { profilePicture } = req.body;

    const userId = req.jwtPayload && req.jwtPayload.id;

    const user = await uProfilePicture(userId, profilePicture);

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(400).json({ errors: ["user not found!"] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { username, name } = req.body;

    const userId = req.jwtPayload && req.jwtPayload.id;

    const checkUsername = await getUserByUsername(username);

    if (checkUsername) {
      res.status(400).json({ errros: ["username already taken!"] });
    }

    const user = await uProfile(userId, username, name);

    if (!user) {
      return res.status(400).json({ errors: "user not found!" });
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const changeRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await updateRoleDoctor(id);

    if (!user) {
      res.status(400).json({ errros: ["user not found!"] });
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};
