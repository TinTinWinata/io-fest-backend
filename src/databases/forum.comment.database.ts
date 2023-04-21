import DBClient from "../../prisma/prisma.client";
import { ForumComment } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const getAllForumComments = async (forumId: string) => {
  const forumComments = await prisma.forumComment.findMany({
    where: {
      forumId: forumId,
    },
    include: {
      _count: true,
      forumReplies: true,
    },
    orderBy: {
        createdAt: "asc"
    }
  });
  return forumComments;
};

export const createForumComment = async (forumComment: ForumComment) => {
  const result = await prisma.forumComment.create({
    data: {
      ...forumComment,
    },
  });
  return result;
};
