import { Request, Response } from "express";
import {
  createForum as cForum,
  getNewestForumsPagination,
  getTopForumsPagination,
  incrementForumSeen,
  updateForum as uForum,
  deleteForum as dForum,
  getForumById,
} from "../databases/forum.database";
import { v4 as uuidv4 } from "uuid";
import { ForumAttachmentType } from "@prisma/client";
import {
  createForumAttachment,
  getAllForumAttachments,
} from "../databases/forum.attachment.database";
import { getPaginationOptions } from "../facades/helper";
import { forumPerPage } from "../utils/constants";
import { PaginationOptions } from "../interfaces/interface";

export const getForum = async (req: Request, res: Response) => {
  try {
    const { forumId } = req.params;

    const forum = await getForumById(forumId);

    if (!forum) {
      res.status(404).json({ errors: ["forum not found!"] });
    }

    res.status(200).json({ forum: forum });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};

export const newestForumPagination = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    let p: number = 1;
    if (typeof page == "string" && !isNaN(parseInt(page))) {
      p = parseInt(page);
    }

    const paginationOptions: PaginationOptions = getPaginationOptions(
      p,
      forumPerPage
    );

    const forums = await getNewestForumsPagination(
      paginationOptions.skip,
      paginationOptions.take
    );

    res.status(200).json({ forums: forums });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};

export const topForumPagination = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    let p: number = 1;
    if (typeof page == "string" && !isNaN(parseInt(page))) {
      p = parseInt(page);
    }

    const paginationOptions: PaginationOptions = getPaginationOptions(
      p,
      forumPerPage
    );

    const forums = await getTopForumsPagination(
      paginationOptions.skip,
      paginationOptions.take
    );

    res.status(200).json({ forums: forums });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};

export const createForum = async (req: Request, res: Response) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ errors: [req.fileValidationError] });
    }

    const { title, description } = req.body;

    const userId = req.jwtPayload && req.jwtPayload.id;

    const forum = await cForum({
      id: uuidv4(),
      title: title,
      description: description,
      userId: userId,
      seen: 0,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });

    if (!forum) {
      return res.status(400).json({ errors: ["forum cannot be made!"] });
    }

    if (!(req.files instanceof Array)) {
      return res.status(400).json({ errors: ["error occurred"] });
    }

    const files = req.files;

    const length = files.length;
    for (let index = 0; index < length; index++) {
      const file = files.at(index);
      var type: ForumAttachmentType = "Video";
      if (!file) {
        return res.status(400).json({ errors: ["error occurred"] });
      }
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        type = "Image";
      }
      await createForumAttachment({
        path: file.originalname,
        forumId: forum.id,
        type: type,
      });
    }

    const forumAttachments = await getAllForumAttachments(forum.id);

    return res
      .status(200)
      .json({ forum: forum, forumAttachments: forumAttachments });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};

export const forumSeen = async (req: Request, res: Response) => {
  try {
    const { forumId } = req.body;
    const forum = await incrementForumSeen(forumId);

    if (!forum) {
      return res.status(400).json({ errors: ["forum not found"] });
    }

    return res.status(200).json({ forum: forum });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};

export const updateForum = async (req: Request, res: Response) => {
  try {
    const { forumId, title, description } = req.body;

    const forum = await uForum(forumId, title, description);

    if (!forum) {
      return res.status(400).json({ errors: ["forum not found"] });
    }

    return res.status(200).json({ forum: forum });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};

export const deleteForum = async (req: Request, res: Response) => {
  try {
    const { forumId } = req.body;

    const forum = await dForum(forumId);

    if (!forum) {
      return res.status(400).json({ errors: ["forum not found"] });
    }
    return res.status(200).json({ successes: ["forum successfully deleted!"] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: ["error occurred"] });
  }
};
