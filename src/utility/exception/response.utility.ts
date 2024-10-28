import { HttpStatus, RequestMethod } from '@nestjs/common';
import { AppLogger } from '@utility/logger';
import { MessageFormatter } from './message.formatter';
import { IResponseError, IResponseSuccess } from './response.type';

const logger = new AppLogger('ErrorResponse');

export const getResponse = async <T>(
  data: T,
  message: string,
  method: number,
): Promise<IResponseSuccess<T>> => {
  logger.enter(getResponse.name);
  logger.debug(`data: ${JSON.stringify(data, null)}`);
  logger.debug(`message: ${message}`);
  logger.debug(`method: ${method}`);

  try {
    const statusCode = getRequestMethodTypeStatusCode(method);
    logger.debug(`Status Code: ${statusCode}`);
    const successResponse: IResponseSuccess<T> = {
      resData: {
        data,
        message,
        statusCode,
      },
    };
    logger.debug(`successResponse: ${JSON.stringify(successResponse)}`);
    logger.exit(getResponse.name);
    return successResponse;
  } catch (err) {
    logger.error('Error while returning message.', err);
  } finally {
    logger.exit(getResponse.name);
  }
};

const getRequestMethodTypeStatusCode = (methodType: number): number => {
  logger.enter(getRequestMethodTypeStatusCode.name);
  let statusCode: number;

  switch (methodType) {
    case RequestMethod.POST:
      statusCode = HttpStatus.CREATED;
      break;
    case RequestMethod.PUT:
      statusCode = HttpStatus.ACCEPTED;
      break;
    default:
      statusCode = HttpStatus.OK;
      break;
  }
  logger.debug(`statusCode: ${statusCode}`);
  logger.exit(getRequestMethodTypeStatusCode.name);
  return statusCode;
};

export const getErrorResponse = async <T>(
  error?: T,
  locale?: string,
  messageKey?: string,
): Promise<IResponseError> => {
  logger.enter(getErrorResponse.name);
  logger.debug(`locale: ${locale}`);
  logger.debug(`messageKey: ${messageKey}`);

  try {
    if (error['errorMessage'] && error['errorCode']) {
      messageKey = error['errorMessage'].replace(`${error['errorCode']}-`, '');
      error['errorMessage'] = await MessageFormatter.errorMessage(
        messageKey,
        locale,
      );
    }
  } catch (err) {
    logger.error('Error while getting error message.', err);
  } finally {
    logger.exit(getErrorResponse.name);
  }

  return getError(error);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getError = (error: any): IResponseError => {
  logger.enter(getError.name);

  const errorResponse: IResponseError = {
    error: {
      statusCode: error?.statusCode || error?.status,
      code: error?.errorCode || error?.code,
      message: error?.errorMessage,
      originalExceptionMessage: error?.originalMessage || error?.message,
      source: error?.source,
    },
  };

  logger.debug(`JSON Error Response: ${JSON.stringify(errorResponse)}`);
  logger.exit(getError.name);

  return errorResponse;
};
