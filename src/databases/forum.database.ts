import DBClient from "../../prisma/prisma.client";
import { Forum } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getAllForum = async () => {
  const forums = await prisma.forum.findMany({
    include: {
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return forums;
};

export const getNewestForumsPagination = async (skip: number, take: number) => {
  const forums = await prisma.forum.findMany({
    skip: skip,
    take: take,
    orderBy: {
      createdAt: "asc",
    },
    include: {
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return forums;
};

export const getTopForumsPagination = async (skip: number, take: number) => {
  const forums = await prisma.forum.findMany({
    skip: skip,
    take: take,
    orderBy: {
      seen: "desc",
    },
    include: {
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return forums;
};

// export const getAllUserForum = async (userId: string) => {
//   const forums = await prisma.forum.findMany({
//     where: {
//       userId: userId,
//     },
//   });
//   return forums;
// };

export const getForumById = async (id: string) => {
  const forum = await prisma.forum.findUnique({
    where: {
      id: id,
    },
    include: {
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return forum;
};

export const createForum = async (forum: Forum) => {
  const result = await prisma.forum.create({
    data: { ...forum },
    include: {
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return result;
};

export const incrementForumSeen = async (id: string) => {
  const forum = await prisma.forum.update({
    where: { id: id },
    data: { seen: { increment: 1 } },
    include: {
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return forum;
};
