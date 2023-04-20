import DBClient from "../../prisma/prisma.client";
import { User, UserRole } from "@prisma/client";
import { deleteFile } from "../facades/helper";
import { profilePictureRelativePath } from "../utils/constants";

const prisma = DBClient.getInstance().prisma;

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      isActive: false,
      profilePicture: true,
      forums: true,
      refreshToken: false,
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
      role: true,
      isActive: true,
      profilePicture: true,
      forums: true,
      activationLink: false,
      refreshToken: false,
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
      password: false,
      role: true,
      isActive: false,
      profilePicture: true,
      forums: true,
      activationLink: false,
      refreshToken: false,
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
      password: false,
      role: true,
      isActive: false,
      profilePicture: true,
      forums: true,
      activationLink: false,
      refreshToken: false,
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
      password: false,
      role: true,
      isActive: false,
      profilePicture: true,
      forums: true,
      activationLink: false,
      refreshToken: false,
    },
  });
  return result;
};

export const activateUser = async (id: string) => {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      isActive: false,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      password: false,
      role: true,
      isActive: false,
      profilePicture: true,
      forums: true,
      activationLink: false,
      refreshToken: false,
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
      password: false,
      role: true,
      isActive: false,
      profilePicture: true,
      forums: true,
      activationLink: false,
      refreshToken: false,
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
      password: false,
      role: true,
      isActive: false,
      profilePicture: true,
      forums: true,
      activationLink: false,
      refreshToken: false,
    },
  });
  return user;
};

export const updateProfile = async (
  id: string,
  username: string,
  name: string
) => {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      username: username,
      name: name,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      password: false,
      role: true,
      isActive: false,
      profilePicture: true,
      forums: true,
      activationLink: false,
      refreshToken: false,
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
      password: false,
      role: true,
      isActive: false,
      profilePicture: true,
      forums: true,
      activationLink: false,
      refreshToken: false,
    },
  });
  return user;
};

export const updateRoleDoctor = async (id: string) => {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      role: "Doctor",
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      password: false,
      role: true,
      isActive: false,
      profilePicture: true,
      forums: true,
      activationLink: false,
      refreshToken: false,
    },
  });
  return user;
};
