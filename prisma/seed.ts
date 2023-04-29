import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  const saltRounds = 10;
  const hashedPassword = await hash('test', saltRounds);

  const testUser = await prisma.user.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      email: 'test@gmail.com',
      name: 'Test',
      password: hashedPassword,
      username: 'Test',
      profilePicture: '/profile.webp',
      isActive: true,
    },
  });

  // !Debugging Purpose
  console.log({ testUser });
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
