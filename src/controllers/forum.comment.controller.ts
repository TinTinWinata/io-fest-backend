import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createForumComment as cForumComment,
  getAllForumComments as gAllForumComments,
} from "../databases/forum.comment.database";

export const createForumComment = async (req: Request, res: Response) => {
  try {
    const { forumId, comment } = req.body;
    console.log('1')
    const userId = req.jwtPayload && req.jwtPayload.id;
    console.log('2')
    
    const forumComment = await cForumComment({
      id: uuidv4(),
      comment: comment,
      forumId: forumId,
      userId: userId,
      createdAt: new Date(Date.now()),
    });
    
    console.log('3')
    if (!forumComment) {
      return res
      .status(400)
      .json({ errors: ["forum comment cannot be made!"] });
    }
    console.log('4')
    
    return res.status(200).json({ successes: ["comment has been added!"] });
  } catch (error) {
    console.log('5')
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};

export const getAllForumComments = async (req: Request, res: Response) => {
  try {
    const { forumId } = req.params;

    const forumComments = await gAllForumComments(forumId);
    return res.status(200).json({ forumComments: forumComments });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};
