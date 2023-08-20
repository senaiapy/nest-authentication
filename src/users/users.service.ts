/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// This should be a real class/interface representing a user entity
export type Users = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  // async findOne(username: string): Promise<Users | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }
  // -------------------------------------------------------

  async findOne(mail: string): Promise<Users | undefined> {
    // Get By ID
    console.log('DEBUG find');
    try {
      const result = await this.prisma.user.findFirst({
        where: {
          email: mail,
        },
      });
      return result;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // -------------------------------------------------------
}
