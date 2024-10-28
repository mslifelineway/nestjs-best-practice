import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { APP_PREFIX } from '@constants';
import { appConfigConstants } from '@utility/config';
import { SwaggerConfig } from '@utility/swagger';
import { AppLogger } from '@utility/logger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appLogger = new AppLogger();
  const app = await NestFactory.create(AppModule, {
    logger: appLogger,
  });

  const port = app.get(ConfigService).get(appConfigConstants.PORT) ?? 3000;

  app.setGlobalPrefix(APP_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  SwaggerConfig.setup(app);

  await app.listen(port);

  console.log(`Administrator auth server is listening on port : ${port}`);
}
bootstrap();
