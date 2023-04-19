import { Request, Response } from "express";
import {
  getUserById as getUser,
  updateProfilePicture as uProfilePicture,
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
    
    return res.status(400).json({ errors: ["user not found"] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ["error occurred!"] });
  }
};
