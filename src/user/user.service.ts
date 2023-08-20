/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResultDto } from './dto/result-user.dto';
import { PrismaService } from '../prisma/prisma.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (process.env.DEBUG === 'true') {
      console.log('DEBUG create', createUserDto);
    }
    try {
      const result = await this.prisma.user.create({
        data: createUserDto,
      });
      return result;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // -------------------------------------------------------

  async createWithToken(createUserDto: CreateUserDto) {
    if (process.env.DEBUG === 'true') {
      console.log('DEBUG create', createUserDto);
    }
    try {
      const result = await this.prisma.user.create({
        data: createUserDto,
      });
      return result;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // -------------------------------------------------------

  async findAll() {
    // Get ALL
    console.log('DEBUG getall');
    try {
      const returno = await this.prisma.user.findMany();
      return returno;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // -------------------------------------------------------

  async findOne(id: number): Promise<User | undefined> {
    // Get By ID
    console.log('DEBUG find');
    try {
      const result = await this.prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      return result;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // -------------------------------------------------------

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (process.env.DEBUG === 'true') {
      console.log('DEBUG update');
    }
    try {
      const result = await this.prisma.user.update({
        data: updateUserDto,
        where: {
          id: id,
        },
      });
      return result;
    } catch (e: any) {
      throw new Error(e);

      console.log('error', e);
    }
  }
  // -------------------------------------------------------

  async updatePut(id: number, updateUserDto: UpdateUserDto) {
    if (process.env.DEBUG === 'true') {
      console.log('DEBUG update');
    }
    try {
      const result = await this.prisma.user.update({
        data: updateUserDto,
        where: {
          id: id,
        },
      });
      return result;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // -------------------------------------------------------
  async remove(id: number) {
    // RDelete By ID
    if (process.env.DEBUG === 'true') {
      console.log('DEBUG delete');
    }
    try {
      const result = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return result;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // ----------------------------------------------------------

  async findDump() {
    // Get ALL
    console.log('DEBUG dump');
    try {
      const users = await this.prisma.user.findMany();
      // const coibfetecnicos = await this.prisma.coibfeTecnico.findMany();
      // const coibfepropriedads = await this.prisma.coibfePropriedad.findMany();
      // const coibfeproductors = await this.prisma.coibfeProductor.findMany();

      const returno = {
        users,
        // coibfetecnicos,
        // coibfepropriedads,
        // coibfeproductors,
      };
      return returno;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // --------------------------------------------------------------

  async findRegister(objs: string, values: any) {
    try {
      const userExist = await this.prisma.user.findFirst({
        where: { [objs]: values },
      });
      if (!userExist) throw new NotFoundException('Este OBJ no existe');
      //const updatedUsuario = Object.assign(userExist, updateDto);
      return userExist;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // --------------------------------------------------------------

  async updateRegister(
    objs: string,
    values: any,
    updateUserDto: UpdateUserDto,
  ) {
    try {
      const usuarioExist = await this.prisma.user.findFirst({
        where: { [objs]: values },
      });
      if (!usuarioExist) throw new NotFoundException('Este OBJ no existe');
      //const updatedUsuario = Object.assign(usuarioExist, updateUserDto);
      const result = await this.prisma.user.update({
        data: updateUserDto,
        where: {
          id: usuarioExist.id,
        },
      });
      return result;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
}
