import DBClient from "../../prisma/prismaClient";
import { Forum } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getAllForum = async () => {
  const forums = await prisma.forum.findMany();
  return forums;
};

export const getForumsPagination = async (skip: number, take: number) => {
  const forums = await prisma.forum.findMany({
    skip: skip,
    take: take,
    orderBy: {
      createdAt: "asc",
    },
  });
  return forums;
};

export const getAllUserForum = async (userId: string) => {
  const forums = await prisma.forum.findMany({
    where: {
      userId: userId,
    },
  });
  return forums;
};

export const getForumById = async (id: string) => {
  const forum = await prisma.forum.findUnique({
    where: {
      id: id,
    },
  });
  return forum;
};

export const createForum = async (forum: Forum) => {
  const result = await prisma.forum.create({
    data: { ...forum },
  });
  return result;
};
