import DBClient from "../../prisma/prismaClient";
import { User } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username: username } });
  return user;
};

export const getUserByRefreshToken = async (refreshToken: string) => {
  const user = await prisma.user.findFirst({
    where: { refreshToken: refreshToken },
  });
  return user;
};

export const createUser = async (user: User) => {
  const result = await prisma.user.create({
    data: { ...user },
  });
  return result;
};

export const activateUser = async (id: string) => {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      isActive: true,
    },
  });
  return user;
};

export const updateRefreshToken = async (id: string, refreshToken: string) => {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      refreshToken: refreshToken,
    },
  });
  return user;
};

export const clearRefreshToken = async (id: string) => {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      refreshToken: "",
    },
  });
  return user;
};
