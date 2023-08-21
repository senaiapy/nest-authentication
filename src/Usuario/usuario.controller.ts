/* eslint-disable @typescript-eslint/no-unused-vars */
// ###########################################
// #  www.pyfoundation.org                   #
// #  Eng Marcelo Anjos                      #
// #  marcelu.phd@gmail.com                  #
// #  23/01/2022                             #
// ###########################################

import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  Logger,
  ValidationPipe,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthsService } from '../Auth/auths/auths.service';
import { JwtAuthGuard } from '../Auth/auths/jwt-auth.guard';
import { Usuarios } from './entities/usuario.entity';

import { UsuariosService } from './usuario.service';
import { CreateUsuariosDto } from './dto/create-usuario.dto';
import { UpdateUsuariosDto } from './dto/update-usuario.dto';

import { UsuariosCadastrarDto } from './dto/usuario.cadastrar.dto';
import { UsuariosLoginDto } from './dto/usuario.cadastrar.dto';
import { ResultadoDto } from './dto/resultado.dto';

// -------------------------------------
import { ApiResponse } from '@nestjs/swagger';
// ADD PrismaService in app.modules.providers
// -------------------------------------

@Controller('api/v0/senaia/wdb')
export class UsuariosController {
  constructor(
    private readonly appService: UsuariosService, // private authService: AuthsService, //private autenticationService: AutenticationService,
  ) {}

  // ---------------------------------------------------
  //  @UseGuards(AuthGuard('local'))
  //   @UseGuards(JwtAuthGuard)
  @Post('usuario')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async create(@Body() createDto: CreateUsuariosDto) {
    console.log('USUARIO', createDto);
    return this.appService.create(createDto);
  }
  // ----------------------------------------------------------

  @Get('usuarios')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async findAll() {
    return this.appService.findAll();
  }
  // ----------------------------------------------------------

  @Get('usuariosdump')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async findAllDump() {
    return this.appService.findAllDump();
  }
  // ----------------------------------------------------------

  @Get('usuario/:id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async findOne(@Param('id') id: number) {
    return this.appService.findOne(+id);
  }
  // ----------------------------------------------------------
  // -----------------------------------------------

  @UseGuards(JwtAuthGuard)
  @Get('usuarios/listar')
  async listar(): Promise<Usuarios[]> {
    return this.appService.listar();
  }

  @Patch('usuario/:id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async update(@Param('id') id: number, @Body() updateDto: UpdateUsuariosDto) {
    return this.appService.update(+id, updateDto);
  }
  // ----------------------------------------------------------

  @Put('usuario/:id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async updatep(@Param('id') id: number, @Body() updateDto: UpdateUsuariosDto) {
    return this.appService.update(+id, updateDto);
  }
  // ----------------------------------------------------------

  @Delete('usuario/:id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async remove(@Param('id') id: number) {
    return this.appService.remove(+id);
  }
  // ----------------------------------------------------------

  @Get('usuario/search/:objs/:values')
  async findRegister(
    @Param('objs') objs: string,
    @Param('values') values: any,
    @Body() updateUsuarioDto: UpdateUsuariosDto,
  ) {
    return this.appService.findRegister(objs, values, updateUsuarioDto);
  }
  // ----------------------------------------------------------

  @Patch('usuario/search/:objs/:values')
  async updateRegister(
    @Param('objs') objs: string,
    @Param('values') values: any,
    @Body() updateUsuarioDto: UpdateUsuariosDto,
  ) {
    return this.appService.updateRegister(objs, values, updateUsuarioDto);
  }
  // ----------------------------------------------------------
  // -----PROPERTY METHODS ------------------------------------
  // ----------------------------------------------------------

  // ACTIVAR
  @Patch('usuario/one/status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuariosDto,
  ) {
    return this.appService.updateStatus(id, updateUsuarioDto);
  }
  // ----------------------------------------------------------

  @Get('usuario/listar_status/:id')
  async listar_status(@Param('id') id: string): Promise<Usuarios> {
    return this.appService.listar_status(id);
  }
  // ----------------------------------------------------------
  @Post('usuario/cadastrar')
  async cadastrar(@Body() data: CreateUsuariosDto): Promise<ResultadoDto> {
    console.log(data);
    return this.appService.cadastrar(data);
  }
  // ----------------------------------------------------------
  // CADASTRAR COIBFE ID
  @Post('usuario/cadastrarCId')
  async cadastrarCId(
    @Body() data: UsuariosCadastrarDto,
  ): Promise<UsuariosCadastrarDto> {
    console.log(data);
    return this.appService.cadastrarCId(data);
  }
  // ----------------------------------------------------------

  @Post('usuario/recoverpassword')
  async recoverpassword(
    @Body() data: UsuariosCadastrarDto,
  ): Promise<UsuariosCadastrarDto> {
    console.log(data);
    return this.appService.recoverpassword(data);
  }
  // ----------------------------------------------------------

  @Post('usuario/simple_login')
  async simpleLogin(@Body() data: UsuariosLoginDto): Promise<UsuariosLoginDto> {
    console.log(data);
    return this.appService.simpleLogin(data);
  }
  // ----------------------------------------------------------
  /*
  @UseGuards(AuthGuard('local'))
  @Post('usuario/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    // return req.username;
  }
  // ----------------------------------------------------------

  @Post('usuario/login-token')
  async loginToken(@Request() req, @Body() data) {
    return this.authService.loginToken(data.token);
  }
  */
}
