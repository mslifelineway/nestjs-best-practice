import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from '@utility/config';
import { APP_FILTER } from '@nestjs/core';
import { CommonExceptionValidateFilter } from '@utility/exception';
import { i18nModule, I18nProviders } from '@utility/i18n';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig.loadConfig],
    }),
    i18nModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CommonExceptionValidateFilter,
    },
    ...I18nProviders,
  ],
})
export class AppModule {}
