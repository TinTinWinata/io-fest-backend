import { NextFunction, Request, Response } from 'express';
import { checkForumCreator } from '../databases/forum.database';

export const isForumCreator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { forumId } = req.params;
    const userId = req.jwtPayload && req.jwtPayload.id;

    if (!userId) {
      return res.status(400).json({ errors: 'error occurred!' });
    }

    const check = await checkForumCreator(forumId, userId);

    if (!check) {
      return res.status(400).json({ errors: 'you are not the forum creator!' });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: ['error occurred!'] });
  }
};
