import { Request, Response } from "express";
import {
  getAllRoles,
  getUserById as getUser,
  getUserByUsername,
  updateProfile as uProfile,
  updateProfilePicture as uProfilePicture,
  updateRoleDoctor,
} from "../databases/user.database";

export const getUserById = async (req: Request, res: Response) => {

};

export const refetch = async (req: Request, res: Response) => {
  try {
    const id = req.jwtPayload && req.jwtPayload.id;
    const user = await getUser(id);
    if (user) {
      const data = {
        user,
      }
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
      res.status(400).json({ errors: ["username already taken!"] });
    }

    const user = await uProfile(userId, username, name);

    if (!user) {
      return res.status(400).json({ errors: ["user not found!"] });
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const changeRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await updateRoleDoctor(userId);

    if (!user) {
      res.status(400).json({ errors: ["user not found!"] });
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const adminPage = async (req: Request, res: Response) => {
  try {
    const { members, doctors, admins } = await getAllRoles();

    return res
      .status(200)
      .json({ members: members, doctors: doctors, admins: admins });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};
