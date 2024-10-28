import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { TAppConfig } from './app.config.type';

export class AppConfig {
  static loadConfig() {
    try {
      const applicationConfig = join(
        __dirname,
        '../../../resources',
        `application-${process.env.NODE_ENV}.yaml`,
      );

      return yaml.load(readFileSync(applicationConfig, 'utf8')) as TAppConfig;
    } catch (error) {
      console.error('Error reading or parsing YAML file:', error);
      throw error;
    }
  }

  static get(key: string) {
    return process.env[key];
  }
}
