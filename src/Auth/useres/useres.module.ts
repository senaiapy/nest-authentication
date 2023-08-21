/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { UseresService } from './useres.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [UseresService, PrismaService],
  exports: [UseresService],
})
export class UseresModule {}
