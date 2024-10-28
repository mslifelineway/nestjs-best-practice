import { SimpleMessage } from '@utility/i18n/simple-message';
import { AppLogger } from '@utility/logger';
import { AppError } from './app.error';
import { AppException } from './app.exception';
import { ExceptionSource } from './exception.source';

export class MessageFormatter {
  private static readonly logger = new AppLogger(MessageFormatter.name);
  private static simpleMessage: SimpleMessage;

  static setSimpleMessageInstance(simpleMessage: SimpleMessage) {
    this.simpleMessage = simpleMessage;
  }

  static async successMessage<T>(
    messageKey: string,
    locale?: string,
    options?: T,
  ): Promise<string> {
    this.logger.enter('successMessage');
    this.logger.debug(`messageKey: ${messageKey}`);
    this.logger.debug(`locale: ${locale}`);
    let successMessage: string;
    try {
      successMessage = await this.simpleMessage.getLocaleMessage(
        messageKey,
        locale,
        options,
      );
    } catch (error) {
      this.handleException(error, 'successMessage');
    }
    this.logger.exit('successMessage');
    return successMessage;
  }

  static async errorMessage<T>(
    messageKey: string,
    locale?: string,
    options?: T,
  ): Promise<string> {
    this.logger.enter('successMessage');
    this.logger.debug(`messageKey: ${messageKey}`);
    this.logger.debug(`locale: ${locale}`);
    let errorMessage: string;
    try {
      errorMessage = await this.simpleMessage.getLocaleErrorMessage(
        messageKey,
        locale,
        options,
      );
    } catch (error) {
      this.handleException(error, 'errorMessage');
    }
    this.logger.exit('errorMessage');
    return errorMessage;
  }

  private static handleException(error: AppError, methodName: string): void {
    this.logger.enter(this.handleException.name);
    this.logger.debug(`methodName: ${methodName}`);
    this.logger.error(error);
    const exceptionError = new AppException(
      error,
      new ExceptionSource(MessageFormatter.name, methodName),
      error,
    );
    this.logger.error(exceptionError);
    this.logger.exit(this.handleException.name);
  }
}
