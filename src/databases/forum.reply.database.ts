import DBClient from "../../prisma/prisma.client";
import { ForumReply } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getAllForumReplies = async (forumCommentId: string) => {
  const forumReplies = await prisma.forumReply.findMany({
    where: {
      forumCommentId: forumCommentId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return forumReplies;
};

export const createForumReply = async (forumReply: ForumReply) => {
  const result = await prisma.forumReply.create({
    data: {
      ...forumReply,
    },
  });
  return result;
};
