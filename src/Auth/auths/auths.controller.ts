/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthsService } from './auths.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { ERole } from './role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { SignUpDto } from './signup.dto';
import { UseresService } from '../useres/useres.service';

@Controller('api/v0/senaia/wdb/auth')
export class AuthsController {
  constructor(
    private authService: AuthsService,
    private userService: UseresService,
  ) {}

  //@HttpCode(HttpStatus.OK)
  //@UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  regisTer(@Body() signInDto: Record<string, any>) {
    return this.authService.regisTer(
      signInDto.username,
      signInDto.password,
      signInDto.email,
      signInDto.user_vpa,
      signInDto.telefone,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('password')
  passWord(@Body() signInDto: Record<string, any>) {
    return this.authService.passWord(
      signInDto.username,
      signInDto.password,
      signInDto.email,
    );
  }
  // ------------------------------------------------------------------------

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(
      signUpDto.username,
      signUpDto.password,
      signUpDto.email,
      signUpDto.user_vpa,
      signUpDto.telefone,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    //console.log('REQ', req.user);
    const user = await this.userService.getProfile(req.user.email);
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Get('test/user')
  getProtected() {
    return 'protected data';
  }
}
