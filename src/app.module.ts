/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './Auth/auths/auths.module';
import { UseresModule } from './Auth/useres/useres.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { UsuariosModule } from './Usuario/usuario.module';

@Module({
  imports: [AuthsModule, UseresModule, UserModule, PostsModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
