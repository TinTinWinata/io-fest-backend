import { Request, Response } from "express";
import {
  createForum as cForum,
  getForumsPagination,
} from "../databases/forum.database";
import { v4 as uuidv4 } from "uuid";
import { ForumAttachmentType } from "@prisma/client";
import { createForumAttachment } from "../databases/forum.attachment.database";
import { getPaginationOptions } from "../facades/helper";
import { forumPerPage } from "../utils/constants";
import { PaginationOptions } from "../interfaces/interface";

export const forumPagination = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    let p: number = 1;


    if (typeof page == "number") {
      console.log("masuk");
      p = page;
    }
    const paginationOptions: PaginationOptions = getPaginationOptions(
      p,
      forumPerPage
    );

    console.log(paginationOptions.skip, paginationOptions.take);

    const forums = await getForumsPagination(
      paginationOptions.skip,
      paginationOptions.take
    );

    res.status(200).json(forums);
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: "error occurred" });
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
      return res.status(400).json({ errors: "forum cannot be made!" });
    }

    if (!(req.files instanceof Array)) {
      return res.status(400).json({ errors: "error occurred" });
    }

    const files = req.files;

    const length = files.length;
    for (let index = 0; index < length; index++) {
      const file = files.at(index);
      var type: ForumAttachmentType = "Video";
      if (!file) {
        return res.status(400).json({ errors: "error occurred" });
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
    return res.status(200).json({ forum: forum });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: "error occurred" });
  }
};
