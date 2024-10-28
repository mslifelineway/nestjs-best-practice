import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfigConstant } from './swagger.config.constant';
import { AppConfig, appConfigConstants } from '@utility/config';

const swaggerApiUrl = AppConfig.get(appConfigConstants.SWAGGER_URL);

const { title, description, version, tag } = swaggerConfigConstant;

const config = new DocumentBuilder()
  .setTitle(title)
  .setDescription(description)
  .setVersion(version)
  .addTag(tag)
  .build();

export class SwaggerConfig {
  static setup(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerApiUrl, app, document);
  }
}
