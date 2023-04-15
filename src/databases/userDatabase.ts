import DBClient from "../../prisma/prismaClient";
import { User } from "../models/model";

const prisma = DBClient.getInstance().prisma;

export const getUserByID = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (user) {
    return user;
  }
  return null;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (user) {
    return user;
  }
  return null;
};

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username: username } });
  if (user) {
    return user;
  }
  return null;
};

export const createUser = async (user: User) => {
  const result = await prisma.user.create({
    data: { ...user },
  });
  return result;
};
