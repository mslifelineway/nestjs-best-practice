import { Injectable } from '@nestjs/common';
import { AppLogger } from '@utility/logger';
import { I18nService } from 'nestjs-i18n';

export type TranslateOptions = {
  args?:
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [k: string]: any;
      }
    | string[];
};

@Injectable()
export class SimpleMessage {
  private readonly logger = new AppLogger(SimpleMessage.name);

  // eslint-disable-next-line no-unused-vars
  constructor(private readonly i18n: I18nService) {}

  async getLocaleMessage(
    messageKey: string,
    locale: string = 'en',
    options?: TranslateOptions,
  ): Promise<string> {
    this.logger.enter(this.getLocaleMessage.name);
    this.logger.debug(`messageKey: ${messageKey}`);
    this.logger.debug(`locale: ${locale}`);
    try {
      const message = await this.i18n.translate(messageKey, {
        lang: locale,
        args: options?.args,
      });

      this.logger.debug(`message: ${message}`);
      this.logger.exit(this.getLocaleMessage.name);

      return message as string;
    } catch (error) {
      this.logger.error(`Error in getLocalMessage: ${error.message}`);

      this.logger.exit(this.getLocaleMessage.name);

      return `Translation not found for key: ${messageKey}`;
    }
  }

  async getLocaleErrorMessage(
    messageKey: string,
    locale?: string,
    options?: TranslateOptions,
  ): Promise<string> {
    this.logger.enter(this.getLocaleErrorMessage.name);
    this.logger.debug(`messageKey: ${messageKey}`);
    this.logger.debug(`locale: ${locale}`);

    try {
      const message = await this.i18n.translate(messageKey, {
        lang: locale,
        args: options?.args,
      });

      this.logger.debug(`message: ${message}`);
      this.logger.exit(this.getLocaleErrorMessage.name);

      return message as string;
    } catch (error) {
      this.logger.error(`Error in getLocaleErrorMessage: ${error.message}`);

      this.logger.exit(this.getLocaleErrorMessage.name);

      return `Error message not found for key: ${messageKey}`;
    }
  }
}
