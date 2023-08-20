import { PrismaService } from './../src/prisma/prisma.service';
import users from './users';

const prisma = new PrismaService();

(function seed() {
  users.forEach(async (user) => {
    await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        email: user.email,
      },
    });
  });
})();
