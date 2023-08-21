/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UseresService } from '../useres/useres.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthsService {
  constructor(
    private usersService: UseresService,
    private jwtService: JwtService,
  ) {}
  // ------------------------------------------------------------

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        return null;
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // ------------------------------------------------------------

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
  // ------------------------------------------------------------

  async regisTer(username: string, pass: string): Promise<any> {
    const hash = await bcrypt.hash(pass, saltOrRounds);
    const user = await this.usersService.create(username, hash);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
  // ------------------------------------------------------------

  async passWord(username: string, pass: string): Promise<any> {
    const hash = await bcrypt.hash(pass, saltOrRounds);
    const user = await this.usersService.update(username, hash);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
  // ------------------------------------------------------------
  // ------------------------------------------------------------

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  // ------------------------------------------------------------

  async signup(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      throw new HttpException('Username taken', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(password, saltOrRounds);
    const newUser = await this.usersService.create(username, hash);
    return {
      id: newUser.id,
    };
  }
}
