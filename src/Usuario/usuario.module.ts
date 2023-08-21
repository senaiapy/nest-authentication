/* eslint-disable @typescript-eslint/no-unused-vars */
// ###########################################
// #  www.pyfoundation.org                   #
// #  Eng Marcelo Anjos                      #
// #  marcelu.phd@gmail.com                  #
// #  23/01/2022                             #
// ###########################################

import { Module } from '@nestjs/common';
import { UsuariosService } from './usuario.service';

import { UsuariosController } from './usuario.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService],
  exports: [UsuariosService], // Remember to export
})
export class UsuariosModule {}
