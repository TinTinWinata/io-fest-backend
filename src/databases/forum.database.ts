import { Forum } from '@prisma/client';
import DBClient from '../../prisma/prisma.client';

const prisma = DBClient.getInstance().prisma;

export const getAllForum = async () => {
  const forums = await prisma.forum.findMany({
    include: {
      forumComments: true,
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return forums;
};

export const getCountForum = async () => {
  return await prisma.forum.count();
};

export const getNewestForumsPagination = async (
  skip: number,
  take: number,
  forumSearch: string
) => {
  const forums = await prisma.forum.findMany({
    where: {
      OR: [
        {
          title: {
            contains: forumSearch,
          },
        },
        {
          description: {
            contains: forumSearch,
          },
        },
      ],
    },
    skip: skip,
    take: take,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      forumComments: true,
      creator: {
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
          password: false,
          isActive: true,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return forums;
};

export const getTopForumsPagination = async (
  skip: number,
  take: number,
  forumSearch: string
) => {
  const forums = await prisma.forum.findMany({
    where: {
      OR: [
        {
          title: {
            contains: forumSearch,
          },
        },
        {
          description: {
            contains: forumSearch,
          },
        },
      ],
    },
    skip: skip,
    take: take,
    orderBy: {
      seen: 'desc',
    },
    include: {
      forumComments: true,
      creator: {
        select: {
          id: true,
          email: true,
          role: true,
          username: true,
          name: true,
          password: false,
          isActive: true,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return forums;
};

// export const getAllUserForum = async (userId: string) => {
//   const forums = await prisma.forum.findMany({
//     where: {
//       userId: userId,
//     },
//   });
//   return forums;
// };

export const getForumById = async (id: string) => {
  const forum = await prisma.forum.findUnique({
    where: {
      id: id,
    },
    include: {
      _count: true,
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          role: true,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
      forumComments: {
        include: {
          _count: true,
          forumReplies: {
            include: {
              replier: {
                select: {
                  id: true,
                  email: false,
                  username: true,
                  role: true,
                  name: true,
                  password: false,
                  isActive: false,
                  profilePicture: true,
                  forums: false,
                  activationLink: false,
                  refreshToken: false,
                },
              },
            },
          },
          commenter: {
            select: {
              id: true,
              role: true,
              email: false,
              username: true,
              name: true,
              password: false,
              isActive: false,
              profilePicture: true,
              forums: false,
              activationLink: false,
              refreshToken: false,
            },
          },
        },
      },
      forumAttachments: true,
    },
  });
  return forum;
};

export const createForum = async (forum: Forum) => {
  const result = await prisma.forum.create({
    data: { ...forum },
    include: {
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return result;
};

export const updateForum = async (
  id: string,
  title: string,
  description: string
) => {
  const result = await prisma.forum.update({
    where: {
      id: id,
    },
    data: { title: title, description: description },
    include: {
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return result;
};

export const incrementForumSeen = async (id: string) => {
  const forum = await prisma.forum.update({
    where: { id: id },
    data: { seen: { increment: 1 } },
    include: {
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return forum;
};

export const deleteForum = async (id: string) => {
  const result = await prisma.forum.delete({
    where: {
      id: id,
    },
    include: {
      creator: {
        select: {
          id: true,
          email: false,
          username: true,
          name: true,
          password: false,
          isActive: false,
          profilePicture: true,
          forums: false,
          activationLink: false,
          refreshToken: false,
        },
      },
    },
  });
  return result;
};

export const checkForumCreator = async (forumId: string, userId: string) => {
  const result = await prisma.forum.findFirst({
    where: {
      id: forumId,
      userId: userId,
    },
  });
  return result;
};
