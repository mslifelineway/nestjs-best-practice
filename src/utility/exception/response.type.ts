/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponseError {
  error: {
    statusCode: string;
    code: number;
    message: string;
    originalExceptionMessage: string;
    source: any;
  };
}

export interface IResponseSuccess<T> {
  resData: {
    data: T;
    message: string;
    statusCode: number;
  };
}

export type IResponse<T = null> = IResponseSuccess<T> | IResponseError;
