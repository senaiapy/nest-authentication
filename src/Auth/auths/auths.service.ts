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

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    // console.log('user3', user, email, password);

    if (user) {
      const isMatch = await bcrypt.compareSync(pass, user.password);
      //const isMatch = async (password: any, user: any) => {
      //  if (password === user.password) {
      //    return true;
      //  } else {
      //    return false;
      //  }
      //};
      if (!isMatch) {
        return null;
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // ------------------------------------------------------------

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    // console.log('user2', email, pass);
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
  // ------------------------------------------------------------

  async regisTer(username: string, pass: string, mail: string): Promise<any> {
    const users = await this.usersService.findOne(mail);
    if (users) {
      throw new HttpException('Username taken', HttpStatus.BAD_REQUEST);
    }
    const hash = bcrypt.hashSync(pass, saltOrRounds);
    const user = await this.usersService.create(username, mail, hash);
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
  // ------------------------------------------------------------

  async passWord(username: string, pass: string, mail: string): Promise<any> {
    const hash = bcrypt.hashSync(pass, saltOrRounds);
    const user = await this.usersService.update(username, mail, hash);
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
  // ------------------------------------------------------------
  // ------------------------------------------------------------

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  // ------------------------------------------------------------

  async signup(username: string, password: string, mail: string): Promise<any> {
    const user = await this.usersService.findOne(mail);
    if (user) {
      throw new HttpException('Username taken', HttpStatus.BAD_REQUEST);
    }
    const hash = bcrypt.hashSync(password, saltOrRounds);
    const newUser = await this.usersService.create(username, mail, hash);
    return {
      id: newUser.id,
    };
  }
}
