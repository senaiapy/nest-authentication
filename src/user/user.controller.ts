/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v0/senaia/wdb')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('user')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async findAll() {
    return this.userService.findAll();
  }

  @Get('user/:id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch('user/:id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Put('user/:id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async updatePut(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updatePut(+id, updateUserDto);
  }

  @Delete('user/:id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
  // ----------------------------------------------------------

  @Get('user/search/:objs/:values')
  async findRegister(
    @Param('objs') objs: string,
    @Param('values') values: any,
  ) {
    return this.userService.findRegister(objs, values);
  }
  // ----------------------------------------------------------

  @Patch('user/search/:objs/:values')
  async updateRegister(
    @Param('objs') objs: string,
    @Param('values') values: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateRegister(objs, values, updateUserDto);
  }
  // ----------------------------------------------------------

  @Get('userdump')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async findAllDump() {
    return this.userService.findDump();
  }
  // ----------------------------------------------------------
  // ----------------------------------------------------------

  @UseGuards(AuthGuard('local'))
  @UseGuards(JwtAuthGuard)
  @Post('user_token')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async createWithToken(@Body() createUserDto: CreateUserDto) {
    console.log('USUARIO', createUserDto);
    return this.userService.createWithToken(createUserDto);
  }
  // ----------------------------------------------------------
}
