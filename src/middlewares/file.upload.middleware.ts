import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  forumRelativePath,
  getFileExtension,
  profilePictureRelativePath,
} from "../facades/helper";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const profilePictureStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
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
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, forumRelativePath);
  },
  filename: (
    req: Request,
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

export const uploadProfilePicture = multer({
  storage: profilePictureStorage,
  fileFilter: profilePictureFileFilter,
});

export const uploadForum = multer({
  storage: forumStorage,
  fileFilter: forumFileFilter,
});
