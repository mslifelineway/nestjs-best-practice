import { AppLogger } from '@utility/logger';
import { AppError } from './app.error';
import { ExceptionSource } from './exception.source';

export class AppException extends Error {
  private readonly errorCode: string;
  private readonly errorMessage: string;
  private readonly statusCode: number;
  private readonly originalMessage: string;
  private readonly originalException: string;
  readonly separator: string = ' - ';
  source: ExceptionSource | undefined;
  isPrintStackTrace: boolean = true;

  constructor(
    error: Partial<AppError>,
    sourceOrE?: ExceptionSource | any,
    e?: any,
  ) {
    super(error?.errorMessage);
    this.errorCode = error?.errorCode || 'UNKNOWN_ERROR';
    this.statusCode = error?.statusCode || 500;
    this.errorMessage = error?.errorMessage || 'An unexpected error occurred';

    if (sourceOrE instanceof ExceptionSource) {
      this.source = sourceOrE;
      this.originalException = e ? e.toString() : '';
    } else {
      this.source = undefined;
      this.originalException = sourceOrE ? sourceOrE.toString() : '';
    }

    this.originalMessage = this.errorMessage;
  }

  static create<T extends AppException>(
    error: Partial<AppError>,
    source?: ExceptionSource,
    e?: any,
  ): T {
    return new AppException(error, source, e) as T;
  }

  static throwError(errorMessage: string): void {
    throw new AppException({ errorMessage });
  }

  printStackTrace(logger: AppLogger): void {
    if (this.isPrintStackTrace) {
      const sourceInfo = this.source
        ? this.source.getSource()
        : 'Unknown source';
      const errorDetails = `Error Code: ${this.errorCode}${this.separator}Status: ${this.statusCode}${this.separator}Message: ${this.errorMessage}${this.separator}Source: ${sourceInfo}`;
      logger.error(errorDetails);

      if (this.originalException) {
        logger.error(`Original Exception: ${this.originalException}`);
      }
    }
  }
}
