import DBClient from "../../prisma/prisma.client";
import { ForumAttachment } from "@prisma/client";

const prisma = DBClient.getInstance().prisma;

export const createForumAttachment = async (
  forumAttachment: ForumAttachment
) => {
  const result = await prisma.forumAttachment.create({
    data: { ...forumAttachment },
  });
  return result;
};

export const getAllForumAttachment = async (forumId: string) => {
  const forumAttachments = await prisma.forumAttachment.findMany({
    where: {
      forumId: forumId,
    },
  });
  return forumAttachments;
};
