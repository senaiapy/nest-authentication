import { ERole } from '../src/Auth/auths/role.enum';

const users = [
  {
    username: 'marcelu',
    password: '123456',
    email: 'marcelu@gmail.com',
    user_vpa: '1234',
    roles: [ERole.ADMIN, ERole.CLIENT],
  },
  {
    username: 'andrea',
    password: '1234567',
    user_vpa: '1334',
    email: 'andrea@gmail.com',
    roles: [ERole.ADMIN, ERole.CLIENT],
  },
  {
    username: 'natash',
    password: '12345678',
    user_vpa: '1335',
    email: 'natash@gmail.com',
    roles: [ERole.CLIENT],
  },
  {
    username: 'jenny',
    password: '123456789',
    email: 'jenny@gmail.com',
    user_vpa: '1336',
    roles: [ERole.CLIENT],
  },
];

export default users;
