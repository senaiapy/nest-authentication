/* eslint-disable @typescript-eslint/no-unused-vars */
// ###########################################
// #  www.pyfoundation.org                   #
// #  Eng Marcelo Anjos                      #
// #  marcelu.phd@gmail.com                  #
// #  23/01/2022                             #
// ###########################################

import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuariosDto } from './dto/create-usuario.dto';
import { UpdateUsuariosDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuario.entity';
import { UsuariosCadastrarDto } from './dto/usuario.cadastrar.dto';
import { ResultadoDto } from './dto/resultado.dto';
import { UsuariosLoginDto } from './dto/usuario.cadastrar.dto';

// import { GLOBAL } from 'src/configs/global';
// eslint-disable-next-line @typescript-eslint/no-var-requires

const DEBUG_PAGE = true;
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);
  constructor(private prisma: PrismaService) {}

  // -------------------------------------------------------
  async create(createDto: CreateUsuariosDto) {
    if (process.env.DEBUG === 'true' || DEBUG_PAGE) {
      console.log('DEBUG create', createDto);
    }

    try {
      const result = await this.prisma.usuario.create({
        data: createDto,
      });
      return result;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // ----------------------------------------------------------

  async findAll() {
    // Get ALL
    console.log('DEBUG getall');
    try {
      const returno = await this.prisma.usuario.findMany();
      return returno;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // ----------------------------------------------------------

  async findFirstUnSync() {
    // Get ALL
    console.log('DEBUG find unsync');
    try {
      const returno = await this.prisma.usuario.findFirst({
        where: {
          user_issinc: 'false',
        },
      });
      return returno;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // ----------------------------------------------------------

  async findManyUnSync() {
    // Get ALL
    console.log('DEBUG find unsync');
    try {
      const returno = await this.prisma.usuario.findMany({
        where: {
          user_issinc: 'false',
        },
      });
      return returno;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // ----------------------------------------------------------

  async findAllDump() {
    // Get ALL
    console.log('DEBUG dump');
    try {
      const usuarios = await this.prisma.usuario.findMany();
      // const coibfetecnicos = await this.prisma.coibfeTecnico.findMany();
      // const coibfepropriedads = await this.prisma.coibfePropriedad.findMany();
      // const coibfeproductors = await this.prisma.coibfeProductor.findMany();

      const returno = {
        usuarios,
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
  // ----------------------------------------------------------

  async findOne(id: number) {
    // Get By ID
    console.log('DEBUG find');
    try {
      const result = await this.prisma.usuario.findUnique({
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

  async update(id: number, updateDto: UpdateUsuariosDto) {
    if (process.env.DEBUG === 'true' || DEBUG_PAGE) {
      console.log('DEBUG update');
    }
    try {
      const result = await this.prisma.usuario.update({
        data: updateDto,
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
  async remove(id: number) {
    // RDelete By ID
    if (process.env.DEBUG === 'true' || DEBUG_PAGE) {
      console.log('DEBUG delete');
    }
    try {
      const result = await this.prisma.usuario.delete({
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
  // ------------------------- C R U D ----------------------------

  async listar(): Promise<Usuarios[]> {
    try {
      return await this.prisma.usuario.findMany();
    } catch (e: any) {
      console.log('error', e);
    }
  }
  // --------------------------------------------------------------

  async findRegister(objs: string, values: any, updateDto: UpdateUsuariosDto) {
    try {
      if (objs === 'vpa') objs = 'cpf';
      const usuarioExist = await this.prisma.usuario.findFirst({
        where: { [objs]: values },
      });
      if (!usuarioExist) throw new NotFoundException('Este OBJ no existe');
      //const updatedUsuario = Object.assign(usuarioExist, updateDto);
      return usuarioExist;
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  }
  // --------------------------------------------------------------

  async updateRegister(
    objs: string,
    values: any,
    updateDto: UpdateUsuariosDto,
  ) {
    try {
      const usuarioExist = await this.prisma.usuario.findFirst({
        where: { [objs]: values },
      });
      if (!usuarioExist) throw new NotFoundException('Este OBJ no existe');
      //const updatedUsuario = Object.assign(usuarioExist, updateDto);
      const result = await this.prisma.usuario.update({
        data: updateDto,
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
  // ----------------------------------------------------------
  // -----PROPERTY METHODS ------------------------------------
  // ----------------------------------------------------------

  async cadastrar(datas: CreateUsuariosDto): Promise<ResultadoDto> {
    try {
      const usuarioExist = await this.prisma.usuario.findFirst({
        where: { cpf: datas.cpf },
      });
      // eslint-disable-next-line prefer-const
      let usuario: CreateUsuariosDto = new CreateUsuariosDto();
      if (datas.email) usuario.email = datas.email;
      if (datas.nome) usuario.nome = datas.nome;
      if (datas.senha) {
        const saltRounds = 8;
        const dados = datas.senha;
        //console.log(dados)
        //usuario.password = bcrypt.hashSync(dados, saltRounds);
        usuario.password = bcrypt.hashSync(dados, saltRounds);
      }
      if (datas.telefone) usuario.telefone = datas.telefone;
      if (datas.cpf) usuario.cpf = datas.cpf;
      if (datas.user_id) usuario.user_id = datas.user_id;
      if (datas.user_name_register)
        usuario.user_name_register = datas.user_name_register;
      if (datas.user_status) usuario.user_status = datas.user_status;
      if (datas.user_locked) usuario.user_locked = datas.user_locked;
      if (datas.user_key_hardware)
        usuario.user_key_hardware = datas.user_key_hardware;
      if (datas.user_level_access)
        usuario.user_level_access = datas.user_level_access;
      if (datas.user_vpa) usuario.user_vpa = datas.user_vpa;
      if (datas.user_token) usuario.user_token = datas.user_token;
      if (datas.user_public_key)
        usuario.user_public_key = datas.user_public_key;
      if (datas.user_private_key)
        usuario.user_private_key = datas.user_private_key;
      if (datas.user_wallet_id) usuario.user_wallet_id = datas.user_wallet_id;
      if (datas.user_system_type)
        usuario.user_system_type = datas.user_system_type;
      if (datas.Status) usuario.Status = datas.Status;

      console.log('USUARIO', usuario);
      if (!usuarioExist) {
        return await this.prisma.usuario
          .create({
            data: usuario,
          })
          .then((result) => {
            this.logger.warn('Tried test', { usuario });

            //  console.log(usuario);
            return <ResultadoDto>{
              status: true,
              mensagem: 'Usuário cadastrado com sucesso',
            };
          })
          .catch((error) => {
            return <ResultadoDto>{
              status: false,
              mensagem: 'Houve um erro ao cadastrar o usuário',
            };
          });
      } else {
        // USUARIO EXISTENCIA
        console.log('PASSWORD_UPDATE');
        const saltRounds = 8;
        const dados = datas.senha;
        console.log('DATA_RECEIVED', dados);
        const password = bcrypt.hashSync(dados, saltRounds);
        console.log('PASSWORD', password);
        if (
          usuarioExist &&
          //bcrypt.compareSync(password, usuarioExist.password) &&
          usuarioExist.email === datas.email
        ) {
          console.log('PASSWORD_OK');
          // LOCK USER
          if (usuario.user_system_type !== 'ADMIN') {
            usuario.user_status = 'inactive';
            usuario.user_locked = 'locked';
          }
          return await this.prisma.usuario
            .update({
              data: usuario,
              where: {
                id: usuarioExist.id,
              },
            })
            .then((result) => {
              this.logger.warn('Tried test', { usuario });

              //  console.log(usuario);
              return <ResultadoDto>{
                status: true,
                mensagem: 'Usuário atualizado com sucesso',
              };
            })
            .catch((error) => {
              return <ResultadoDto>{
                status: false,
                mensagem: 'Houve um erro ao atualizar o usuário',
              };
            });
        }
      }
    } catch (e: any) {
      console.log('error', e);
    }
  }
  // ------------------------------------------------------

  async recoverpassword(
    data: UsuariosCadastrarDto,
  ): Promise<UsuariosCadastrarDto> {
    try {
      const usuarioExist = await this.prisma.usuario.findFirst({
        where: { cpf: data.cpf },
      });
      if (!usuarioExist) throw new NotFoundException('Este uSUARIO no existe');

      // const updatedUsuario = Object.assign(usuarioExist, data);
      // return await this.prisma.usuario.save(updatedUsuario);

      return usuarioExist;
    } catch (e: any) {
      console.log('error', e);
    }
  }
  // ------------------------------------------------------

  async cadastrarCId(
    data: UsuariosCadastrarDto,
  ): Promise<UsuariosCadastrarDto> {
    try {
      const usuarioExist = await this.prisma.usuario.findFirst({
        where: { cpf: data.cpf },
      });
      if (!usuarioExist) throw new NotFoundException('Este uSUARIO no existe');
      const updatedUsuario = Object.assign(usuarioExist, data);

      return await this.prisma.usuario.update({
        data: data,
        where: {
          id: usuarioExist.id,
        },
      });
    } catch (e: any) {
      console.log('error', e);
    }
  }
  // ------------------------------------------------------

  async simpleLogin(data: UsuariosCadastrarDto): Promise<UsuariosLoginDto> {
    // console.log('DATA ', data);
    try {
      const usuarioExist = await this.prisma.usuario.findFirst({
        where: { email: data.email },
      });
      // console.log('USUARIO ', usuarioExist);
      if (!usuarioExist) throw new NotFoundException('Este uSUARIO no existe');
      //const updatedUsuario = Object.assign(usuarioExist, data);
      const saltRounds = 8;
      const sendPassword = data.password;
      //usuario.password = bcrypt.hashSync(dados, saltRounds);
      //const password = bcrypt.hashSync(dados, saltRounds);
      // console.log('PASSWORD ', sendPassword);
      if (
        usuarioExist &&
        bcrypt.compareSync(sendPassword, usuarioExist.password)
      ) {
        console.log('AKI ');
        return usuarioExist;
      }
      // return null;
      return <UsuariosLoginDto>{
        email: 'error',
        password: 'Houve um erro ao atualizar o usuário',
      };
    } catch (e: any) {
      console.log('error', e);
    }
  }
  // ------------------------------------------------------

  async listar_status(id: string): Promise<Usuarios> {
    try {
      const usuarioExist = await this.prisma.usuario.findFirst({
        where: { cpf: id },
      });
      if (!usuarioExist) throw new NotFoundException('Este post no existe');
      return usuarioExist;
    } catch (e: any) {
      console.log('error', e);
    }
  }
  // -------------------------------------------------------

  // activar
  async updateStatus(id: string, updateUsuarioDto: UpdateUsuariosDto) {
    try {
      const usuarioExist = await this.prisma.usuario.findFirst({
        where: { cpf: id },
      });
      if (!usuarioExist) throw new NotFoundException('Este User no existe');
      const updatedUsuario = Object.assign(usuarioExist, updateUsuarioDto);
      return await this.prisma.usuario.update({
        data: updateUsuarioDto,
        where: {
          id: usuarioExist.id,
        },
      });
    } catch (e: any) {
      console.log('error', e);
    }
  }
  // -------------------------------------------------------
  /*

  async Login(data: s): Promise<Usuario> {
    // console.log('DATA ', data);
    try {
      const usuarioExist = await this.prisma.usuario.findFirst({
        where: { email: data.email },
      });
      // console.log('USUARIO ', usuarioExist);
      if (!usuarioExist) throw new NotFoundException('Este uSUARIO no existe');
      //const updatedUsuario = Object.assign(usuarioExist, data);
      const saltRounds = 8;
      const sendPassword = data.password;
      //usuario.password = bcrypt.hashSync(dados, saltRounds);
      //const password = bcrypt.hashSync(dados, saltRounds);
      // console.log('PASSWORD ', sendPassword);
      if (
        usuarioExist &&
        bcrypt.compareSync(sendPassword, usuarioExist.password)
      ) {
        console.log('AKI ');
        return usuarioExist;
      }
      // return null;
      return <Usuarios>{
        email: 'error',
        password: 'Houve um erro ao atualizar o usuário',
      };
    } catch (e: any) {
      console.log('error', e);
    }
  }
*/
}
