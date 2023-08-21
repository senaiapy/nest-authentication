/* eslint-disable @typescript-eslint/no-unused-vars */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthsService } from './auths.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthsService) {
    //super();
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    // console.log('user', user, email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
