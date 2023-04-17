import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createActivationLink,
  deleteActivationLinkById,
  getActivationLinkById,
} from "../databases/activation.link.database";
import { activateUser, getUserById } from "../databases/user.database";
import { sendEmail } from "../facades/helper";
import { User } from "@prisma/client";

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const activationLink = await getActivationLinkById(id);

    if (!activationLink) {
      return res.status(404).json({ errors: ["activation link not found!"] });
    }

    if (Date.now() > activationLink.expirationDate.getTime()) {
      await deleteActivationLinkById(activationLink.id);
      return res.status(410).json({ errors: ["activation link expired!"] });
    }

    await activateUser(activationLink.userId);
    await deleteActivationLinkById(activationLink.id);
    return res.status(200).json({ successes: ["user activated successfully!"] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occured"] });
  }
};

export const generateActivationLink = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await getUserById(id);

  if (user) {
    const activationLink = await createActivationLink({
      id: uuidv4(),
      userId: user.id,
      expirationDate: new Date(Date.now() + 3600 * 1000 * 2),
    });

    await sendEmail(user.email, activationLink.id);

    return res.status(200).json({ successes: ["email sent successfully!"] });
  }

  return res.status(404).json({ errors: ["user not found"] });
};
