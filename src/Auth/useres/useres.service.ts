/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../auths/role.entity';
import { UserDto } from './useres.dto';
import { User } from './useres.entity';
import { PrismaService } from '../../prisma/prisma.service';

// This should be a real class/interface representing a user entity
export type Users = any;

@Injectable()
export class UseresService {
  constructor(
    // @Inject('USER_REPOSITORY')
    // private userRepository: Repository<User>,
    private prisma: PrismaService,
  ) {}
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

  async findOne(email: string): Promise<Users | undefined> {
    // Get By ID
    //    const user = await this.userRepository.findOne(
    //  { where: { username }, relations: { roles: true } });
    let user = null;
    try {
      user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      console.log('DEBUG findOneByMail', user);
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
    // console.log('user4', user, email);

    return user;
  }
  // -------------------------------------------------------
  async create(
    username: string,
    mail: string,
    passwordHash: string,
  ): Promise<Users | undefined> {
    /*
    if (datas.senha) {
        const saltRounds = 8;
        const dados = datas.senha;
        //console.log(dados)
        //usuario.password = bcrypt.hashSync(dados, saltRounds);
        usuario.password = bcrypt.hashSync(dados, saltRounds);
      }
      */
    // Get By ID
    // const user = new User();
    // user.username = username;
    // user.password = password;
    // const role = new Role();
    // role.id = 1;
    // user.roles = [role];
    // await this.userRepository.save(user);
    // return user;
    console.log('DEBUG find');
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: mail,
        },
      });
      const usuario: UserDto = new UserDto();
      let usuarios = null;
      if (!user) {
        usuario.email = mail;
        usuario.username = username;
        usuario.password = passwordHash;
        const role = new Role();
        //role.id = 1;
        //usuario.roles = [role];
        usuarios = await this.prisma.user.create({
          data: usuario,
        });
      }
      return usuarios;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // -------------------------------------------------------
  async update(
    username: string,
    mail: string,
    passwordHash: string,
  ): Promise<Users | undefined> {
    // Get By ID
    console.log('DEBUG find');
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: mail,
        },
      });
      const usuario: UserDto = new UserDto();
      let usuarios = null;
      if (user) {
        usuario.email = mail;
        usuario.username = username;
        usuario.password = passwordHash;

        usuarios = await this.prisma.user.update({
          data: usuario,
          where: {
            id: user.id,
          },
        });
      }

      return usuarios;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // -------------------------------------------------------
  async getProfile(mail: string): Promise<UserDto | undefined> {
    //const user = await this.userRepository.findOne({ where: { username } });

    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: mail,
        },
      });

      if (!user) {
        return undefined;
      }

      const userDto = new UserDto();
      userDto.username = user.username;
      return userDto;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
}
