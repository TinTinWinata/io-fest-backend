import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createForumReply as cForumReply,
  getAllForumReplies as gAllForumReplies,
} from "../databases/forum.reply.database";

export const createForumReplies = async (req: Request, res: Response) => {
  try {
    const { forumCommentId, reply } = req.body;

    const userId = req.jwtPayload && req.jwtPayload.id;

    const forumReply = await cForumReply({
      id: uuidv4(),
      reply: reply,
      forumCommentId: forumCommentId,
      userId: userId,
      createdAt: new Date(Date.now()),
    });

    if (!forumReply) {
      return res.status(400).json({ errors: ["forum reply cannot be made!"] });
    }

    return res.status(200).json({ successes: ["reply has been added!"] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};

export const getAllForumReplies = async (req: Request, res: Response) => {
  try {
    const { forumCommentId } = req.params;

    const forumReplies = await gAllForumReplies(forumCommentId);
    return res.status(200).json({ forumReplies: forumReplies });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};
