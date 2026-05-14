import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { bootstrapConfig } from './bootstrap/bootstrap-config';

async function bootstrap() {
  await bootstrapConfig();
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'nest-boilerplate',
      logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
      timestamp: true,
      colors: true,
    }),
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
