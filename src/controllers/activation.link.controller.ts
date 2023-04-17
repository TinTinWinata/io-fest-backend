import { Request, Response } from "express";
import {
  deleteActivationLinkById,
  getActivationLinkById,
} from "../databases/activation.link,database";
import { activateUser } from "../databases/user.database";

export const verifyUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const activationLink = await getActivationLinkById(id);

  if (!activationLink) {
    return res.send(404);
  }

  if (Date.now() > activationLink.expirationDate.getTime()) {
    await deleteActivationLinkById(activationLink.id);
    return res.status(410);
  }

  const activeUser = await activateUser(activationLink.userId);
  await deleteActivationLinkById(activationLink.id);

  return res.send(200).json(activeUser);
};
