import { Request, Response } from "express";
import { createForum as cForum } from "../databases/forum.database";
import { v4 as uuidv4 } from "uuid";
import { ForumAttachment, ForumAttachmentType } from "@prisma/client";
import { createForumAttachment } from "../databases/forum.attachment.database";
import { File } from "buffer";

export const createForum = async (req: Request, res: Response) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ errors: [req.fileValidationError] });
    }

    const { title, description } = req.body;

    const userId = req.jwtPayload.id;

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
      const f = files.at(index);
      var type: ForumAttachmentType = "Video";
      if (!f) {
        return res.status(400).json({ errors: "error occurred" });
      }
      if (
        f.mimetype === "image/png" ||
        f.mimetype === "image/jpg" ||
        f.mimetype === "image/jpeg"
      ) {
        type = "Image";
      }
      await createForumAttachment({
        path: f.originalname,
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
