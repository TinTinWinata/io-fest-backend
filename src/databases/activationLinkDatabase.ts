import DBClient from "../../prisma/prismaClient";
import { ActivationLink } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getActivationLinkById = async (id: string) => {
  const activationLink = await prisma.activationLink.findUnique({
    where: { id: id },
  });
  return activationLink;
};

export const deleteActivationLinkById = async (id: string) => {
  const activationLink = await prisma.activationLink.delete({
    where: { id: id },
  });
  return activationLink;
};

export const createActivationLink = async (activationLink: ActivationLink) => {
  const result = await prisma.activationLink.create({
    data: { ...activationLink },
  });
  return result;
};
