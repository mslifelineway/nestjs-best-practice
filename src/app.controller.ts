import { Controller, Get, RequestMethod, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AppLogger } from '@utility/logger';
import { AppException } from '@utility/exception/app.exception';
import { AppError } from '@utility/exception/app.error';
import { StatusCodes } from 'http-status-codes';
import { ExceptionSource } from '@utility/exception/exception.source';
import { IResponse, MessageFormatter } from '@utility/exception';
import {
  getErrorResponse,
  getResponse,
} from '@utility/exception/response.utility';
import { Response } from 'express';

@Controller()
export class AppController {
  private readonly logger = new AppLogger(AppController.name);

  // eslint-disable-next-line no-unused-vars
  constructor(private readonly appService: AppService) {
    this.logger.info(`AppController initialized.`);
  }

  @Get()
  async getTestData(@Res() res: Response) {
    this.logger.enter(this.getTestData.name);

    let response: IResponse<number>;

    try {
      const data: number = await this.appService.getTestData();

      const message = await MessageFormatter.successMessage('TEST');

      this.logger.debug(`message: ${message}`);
      response = await getResponse<number>(data, message, RequestMethod.GET);
    } catch (error) {
      this.logger.exit(this.getTestData.name);
      response = await getErrorResponse(error);
    } finally {
      this.logger.exit(this.getTestData.name);
    }
    return res.json(response);
  }

  @Get('/check-error-message')
  async checkErrorMessage(@Res() res: Response) {
    this.logger.enter(this.checkErrorMessage.name);

    let response: IResponse<number>;

    try {
      /**
       * let's throw an custom error
       * Process to create an exception
       */
      const errorCode = new AppError(
        '10000',
        StatusCodes.BAD_REQUEST,
        'Bad request',
      );

      const exception = AppException.create(
        errorCode,
        new ExceptionSource(this.constructor.name, this.checkErrorMessage.name),
      );

      response = await getErrorResponse(exception);
    } catch (error) {
      this.logger.exit(this.getTestData.name);
      response = await getErrorResponse(error);
    } finally {
      this.logger.exit(this.checkErrorMessage.name);
    }
    return res.json(response);
  }
}
