import { Secret } from "jsonwebtoken";

export const accessTokenSecret: Secret =
  process.env.ACCESS_TOKEN_SECRET || "mbVBFoeO40bcE3AilczmnM7IcQY0xWQwsC7Hbuqu";
export const refreshTokenSecret: Secret =
  process.env.REFRESH_TOKEN_SECRET ||
  "CkwmqZBk2e8HPkwsxi0lbZrvqej7BYpmNmTvJZTL";

export const profilePictureRelativePath: string =
  "./src/public/profilePicture/";

export const forumRelativePath: string = "./src/public/forum/";

export const maxForumAttachmentCount: number = 8;

export const forumPerPage: number = 6;
