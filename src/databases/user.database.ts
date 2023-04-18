import DBClient from "../../prisma/prismaClient";
import { User } from "@prisma/client";
import { deleteFile, profilePictureRelativePath } from "../facades/helper";

const prisma = DBClient.getInstance().prisma;

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      isActive: true,
      profilePicture: true,
      forums: true,
      refreshToken: true,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      password: true,
      isActive: true,
      profilePicture: true,
      forums: true,
      refreshToken: true,
    },
  });
  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      isActive: true,
      profilePicture: true,
      forums: true,
      refreshToken: true,
    },
  });
  return user;
};

export const getUserByRefreshToken = async (refreshToken: string) => {
  const user = await prisma.user.findFirst({
    where: { refreshToken: refreshToken },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      isActive: true,
      profilePicture: true,
      forums: true,
      refreshToken: true,
    },
  });
  return user;
};

export const createUser = async (user: User) => {
  const result = await prisma.user.create({
    data: { ...user },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      isActive: true,
      profilePicture: true,
      forums: true,
      refreshToken: true,
    },
  });
  return result;
};

export const activateUser = async (id: string) => {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      isActive: true,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      isActive: true,
      profilePicture: true,
      forums: true,
      refreshToken: true,
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
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      isActive: true,
      profilePicture: true,
      forums: true,
      refreshToken: true,
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
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      isActive: true,
      profilePicture: true,
      forums: true,
      refreshToken: true,
    },
  });
  return user;
};

export const updateProfilePicture = async (
  id: string,
  profilePicture: string
) => {
  const prevUser = await getUserById(id);

  if (prevUser) {
    if (prevUser.profilePicture !== "") {
      deleteFile(profilePictureRelativePath + prevUser.profilePicture);
    }
  }

  const user = await prisma.user.update({
    where: { id: id },
    data: {
      profilePicture: profilePicture,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      isActive: true,
      profilePicture: true,
      forums: true,
      refreshToken: true,
    },
  });
  return user;
};
