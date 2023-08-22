pnpm i -g @nestjs/cli@latest
nest new authentication
cd authentication
pnpm add @nestjs/passport passport passport-local
pnpm add -D @types/passport-local
npx nest g module auth
npx nest g service auth
npx nest g module users
npx nest g service users
pnpm dev
pnpm install prisma --save-dev
npx prisma
npx prisma init
nano ./prisma/schema.prisma
pnpm install @prisma/client
pnpm add -D prisma-dbml-generator
pnpm prisma:pull
pnpm prisma:generate
pnpm i
pnpm migrate-forces
pnpm migrate-devs
pnpm prisma:studio

nano ./src/rpisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}



curl -X POST http://localhost:3333/api/v0/senaia/wdb/auth/login -d '{ "email": "marcelu@gmail.com", "username": "marcelu", "password": "123456"}' -H "Content-Type: application/json"

curl -X GET http://localhost:3333/api/v0/senaia/wdb/auth/profile -H "Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmNlbHVAZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE2OTI2NTg3MTAsImV4cCI6MTY5MjY2NDcxMH0.C_msWI8kVbp-_xNfVm-3kf89DAx-1eYz_LpSHz4Hbr0"