import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  async function myIp() {
    await fetch('http://httpbin.org/ip')
      .then((response) => response.json())
      .then((data) => {
        // do what you want to do with the IP address
        // ... eg. log it to the console
        console.log(data.origin);
        return data.origin;
      });
  }
  const ips = myIp();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  console.log(`
  🚀 Server ready at: http://localhost:${process.env.PORT}
  🚀 API ready at: http://localhost:${process.env.PORT}/api/v0/senaia/
  🚀 Server at: ${process.env.VERSION}
  🚀 Server at: ${process.env.KERNEL}
  `);
}
bootstrap();
