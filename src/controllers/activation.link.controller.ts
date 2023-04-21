import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createActivationLink,
  deleteActivationLinkById,
  getActivationLinkById,
} from "../databases/activation.link.database";
import { activateUser as aUser, getUserById } from "../databases/user.database";
import { sendEmail } from "../facades/helper";

export const activateUser = async (req: Request, res: Response) => {
  try {
    const { activationLinkId } = req.body;

    const activationLink = await getActivationLinkById(activationLinkId);

    if (!activationLink) {
      return res.status(404).json({ errors: ["activation link not found!"] });
    }

    if (Date.now() > activationLink.expirationDate.getTime()) {
      return res.status(410).json({ errors: ["activation link expired!"] });
    }

    if (await aUser(activationLink.userId)) {
      await deleteActivationLinkById(activationLink.id);
    }
    return res
      .status(200)
      .json({ successes: ["user activated successfully!"] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred!"] });
  }
};

export const generateActivationLink = async (req: Request, res: Response) => {
  try {
    const { userId, activationLinkId } = req.body;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ errors: ["user not found!"] });
    }

    const activationLink = await createActivationLink({
      id: uuidv4(),
      userId: user.id,
      expirationDate: new Date(Date.now() + 3600 * 1000 * 2),
    });

    if (activationLink && (await sendEmail(user.email, activationLink.id))) {
      await deleteActivationLinkById(activationLinkId);
    }

    return res.status(200).json({ successes: ["email sent successfully!"] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred!"] });
  }
};
