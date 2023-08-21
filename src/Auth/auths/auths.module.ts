/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UseresModule } from '../useres/useres.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthsController } from './auths.controller';
@Module({
  imports: [
    UseresModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [AuthsService, LocalStrategy, JwtStrategy],
  controllers: [AuthsController],
  exports: [AuthsService],
})
export class AuthsModule {}
