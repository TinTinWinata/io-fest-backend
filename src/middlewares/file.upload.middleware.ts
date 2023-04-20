import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";
import { getFileExtension } from "../facades/helper";
import {
  forumRelativePath,
  maxForumAttachmentCount,
  profilePictureRelativePath,
} from "../utils/constants";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const profilePictureStorage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, profilePictureRelativePath);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const fileName = uuidv4() + getFileExtension(file.originalname);
    req.body.profilePicture = fileName;
    callback(null, fileName);
  },
});

const profilePictureFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    req.fileValidationError =
      "invalid file type. Only PNG, JPG, and JPEG files are allowed!";
    callback(null, false);
  }
};

const forumStorage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, forumRelativePath);
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const fileName = uuidv4() + getFileExtension(file.originalname);
    file.originalname = fileName;
    callback(null, fileName);
  },
});

const forumFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/quicktime" ||
    file.mimetype === "video/x-matroska"
  ) {
    callback(null, true);
  } else {
    req.fileValidationError = "invalid file type!";
    callback(null, false);
  }
};

export const uploadProfilePicture = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  multer({
    storage: profilePictureStorage,
    fileFilter: profilePictureFileFilter,
  }).single("profilePicture")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ message: "An error occurred while uploading files" });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred while uploading files" });
    }
    return next();
  });
};

export const uploadForum = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  multer({
    storage: forumStorage,
    fileFilter: forumFileFilter,
  }).array("forumAttachments", maxForumAttachmentCount)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ message: "Too many files uploaded" });
      }
      return res
        .status(500)
        .json({ message: "An error occurred while uploading files" });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred while uploading files" });
    }
    return next();
  });
};
