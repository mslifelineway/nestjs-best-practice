export class AppError {
  errorCode: string;
  statusCode: number;
  errorMessage: string;

  constructor(errorCode: string, statusCode: number, errorMessage: string) {
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
}
