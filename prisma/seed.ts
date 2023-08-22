import { PrismaService } from './../src/prisma/prisma.service';
import users from './users';

const prisma = new PrismaService();

(function seed() {
  users.forEach(async (user) => {
    await prisma.usuario.create({
      data: {
        username: user.username,
        user_vpa: user.user_vpa,
        password: user.password,
        email: user.email,
        //roles: user.roles,
      },
    });
  });
})();
