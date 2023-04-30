import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  const saltRounds = 10;

  const testUser = await prisma.user.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      email: 'member@gmail.com',
      name: 'Member',
      password: await hash('member', saltRounds),
      username: 'Test',
      profilePicture: '/profile.webp',
      isActive: true,
      role: 'Member',
    },
  });
  const testUser1 = await prisma.user.upsert({
    where: { email: 'doctor@gmail.com' },
    update: {},
    create: {
      email: 'doctor@gmail.com',
      name: 'Doctor',
      password: await hash('doctor', saltRounds),
      username: 'Doctor',
      profilePicture: '/profile.webp',
      isActive: true,
      role: 'Doctor',
    },
  });
  const testUser2 = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: await hash('admin', saltRounds),
      username: 'Admin',
      profilePicture: '/profile.webp',
      isActive: true,
      role: 'Admin',
    },
  });

  // !Debugging Purpose
  console.log({ testUser, testUser1, testUser2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
