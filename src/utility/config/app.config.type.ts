export type TConfig = {
  SERVER: {
    HOST: string;
    PORT: string;
  };

  NODE_ENV: string;

  LOGGER: {
    LEVEL: string;
    FILE_NAME: string;
    ERROR_FILE_NAME: string;
    DATE_FORMAT: string;
  };

  SWAGGER_URL: string;
};

/**
 * TAppConfig is type for all the combined env configs.
 */
export type TAppConfig = TConfig;
