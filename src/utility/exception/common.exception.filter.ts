import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AppException } from './app.exception';
import { Response } from 'express';
import { getErrorResponse } from './response.utility';

@Catch(AppException)
export class CommonExceptionValidateFilter
  implements ExceptionFilter<AppException>
{
  async catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const customResponse = await getErrorResponse(exception);

    response.json(customResponse);
  }
}
