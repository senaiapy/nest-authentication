/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../auths/role.entity';
import { UseresDto } from './useres.dto';
import { PrismaService } from '../../prisma/prisma.service';

// This should be a real class/interface representing a user entity
export type Useres = any;

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
  //   return this.users.find((user) => usuario.username === username);
  // }
  // -------------------------------------------------------

  async findOne(email: string): Promise<UseresDto | undefined> {
    // Get By ID
    //    const user = await this.userRepository.findOne(
    //  { where: { username }, relations: { roles: true } });
    let user = null;
    try {
      user = await this.prisma.usuario.findFirst({
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
    user_vpa: string,
    telefone: string,
  ): Promise<Useres | undefined> {
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
    // usuario.username = username;
    // usuario.password = password;
    // const role = new Role();
    // role.id = 1;
    // usuario.roles = [role];
    // await this.userRepository.save(user);
    // return user;
    console.log('DEBUG find');
    try {
      const user = await this.prisma.usuario.findFirst({
        where: {
          email: mail,
        },
      });
      const usuario: Useres = new UseresDto();
      let usuarios = null;
      if (!user) {
        usuario.email = mail;
        usuario.username = username;
        usuario.nome = username;
        usuario.user_name = username;
        usuario.password = passwordHash;
        const role = new Role();
        role.id = 1;
        //usuario.roles = [role];
        usuario.user_vpa = user_vpa;
        usuario.cpf = user_vpa;
        usuario.telefone = telefone;

        usuarios = await this.prisma.usuario.create({
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
  ): Promise<UseresDto | undefined> {
    // Get By ID
    console.log('DEBUG find');
    try {
      const user = await this.prisma.usuario.findFirst({
        where: {
          email: mail,
        },
      });
      const usuario: Useres = new UseresDto();
      let usuarios = null;
      if (user) {
        usuario.email = mail;
        usuario.username = username;
        usuario.password = passwordHash;

        usuarios = await this.prisma.usuario.update({
          data: usuario,
          where: {
            email: usuario.email,
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
  async getProfile(mail: string): Promise<UseresDto | undefined> {
    //const user = await this.userRepository.findOne({ where: { username } });

    try {
      const user = await this.prisma.usuario.findFirst({
        where: {
          email: mail,
        },
      });

      if (!user) {
        return undefined;
      }

      const userDto = new UseresDto();
      userDto.username = user.username;
      return userDto;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
}
