import express, { Request, Response } from "express";
import {
  deleteActivationLinkById,
  getActivationLinkById,
} from "../databases/activationLinkDatabase";
import { activateUser } from "../databases/userDatabase";

export const verifyUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const activationLink = await getActivationLinkById(id);

  if (!activationLink) {
    return res.send(404);
  }

  if (Date.now() > activationLink.expirationDate.getTime()) {
    await deleteActivationLinkById(activationLink.id);
    return res.sendStatus(410);
  }

  const activeUser = await activateUser(activationLink.userId);
  await deleteActivationLinkById(activationLink.id);

  return res.send(200).json(activeUser).end();
};
