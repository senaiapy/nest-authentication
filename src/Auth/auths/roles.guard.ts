/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UseresService } from '../useres/useres.service';
import { ERole } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UseresService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const dbUser = await this.userService.findOne(user.email);

    const returno = () => {
      let value1 = '';
      const roleValue = requiredRoles.some((role) => {
        console.log('role', role);
        value1 = String(role);
        return value1;
      });
      let value2 = '';
      const rolesUser = dbUser.roles?.some((r) => {
        console.log('R', r);
        value2 = String(r);
        return value2;
      });
      if (value1 === value2) return true;
      else return false;
    };

    requiredRoles.some((role) => dbUser.roles?.some((r) => r.name == role));
    return returno();

    //  return requiredRoles.some((role) =>
    //   dbUser.roles?.some((r) => r.name == role),
    // );
  }
}
