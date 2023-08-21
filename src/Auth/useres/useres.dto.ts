import { Role } from '../auths/role.entity';

export class UserDto {
  email: string;
  username?: string;
  password?: string;
  roles?: Role[];
}
