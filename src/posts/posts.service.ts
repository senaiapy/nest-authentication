/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

export type Post = any;

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    if (process.env.DEBUG === 'true') {
      console.log('DEBUG create', createPostDto);
    }
    try {
      const result = await this.prisma.post.create({
        data: createPostDto,
      });
      return result;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // -------------------------------------------------------
  // -------------------------------------------------------

  async findAll() {
    // Get ALL
    console.log('DEBUG getall');
    try {
      const returno = await this.prisma.post.findMany();
      return returno;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // -------------------------------------------------------

  async findOne(id: number): Promise<Post | undefined> {
    // Get By ID
    console.log('DEBUG find');
    try {
      const result = await this.prisma.post.findFirst({
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

  async update(id: number, updatePostDto: UpdatePostDto) {
    if (process.env.DEBUG === 'true') {
      console.log('DEBUG update');
    }
    try {
      const result = await this.prisma.post.update({
        data: updatePostDto,
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
  async remove(id: number) {
    // RDelete By ID
    if (process.env.DEBUG === 'true') {
      console.log('DEBUG delete');
    }
    try {
      const result = await this.prisma.post.delete({
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
}
