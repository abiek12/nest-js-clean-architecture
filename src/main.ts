import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, Logger } from '@nestjs/common';
import { bootstrapConfig } from './lifecycle/bootstrap-config';

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

  app.enableShutdownHooks();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
