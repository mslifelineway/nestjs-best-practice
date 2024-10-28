import { LoggerService } from '@nestjs/common';
import { AppConfig } from '@utility/config';
import * as winston from 'winston';
import * as moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';

//DEFAULT FILE NAMES FOR THE LOGS
const defaultLogFilename = 'app.log';
const defaultErrorLogFilename = 'error.log';
const defaultLogDateFormat = 'YYYY-MM-DD HH:mm:ss';

const logDirectory = path.join(__dirname, '..', '..', '..', 'logs');
// eslint-disable-next-line no-undef
const packageInfo = require('../../../package.json');

export class AppLogger implements LoggerService {
  private readonly logger: winston.Logger;
  private readonly config = AppConfig.loadConfig();
  private readonly logLevel = this.config?.LOGGER?.LEVEL ?? 'debug';
  private readonly logDateFormat =
    this.config?.LOGGER?.DATE_FORMAT ?? defaultLogDateFormat;
  private readonly logFilename = path.join(
    logDirectory,
    this.config?.LOGGER?.FILE_NAME ?? defaultLogFilename,
  );
  private readonly errorLogFilename = path.join(
    logDirectory,
    this.config?.LOGGER?.ERROR_FILE_NAME ?? defaultErrorLogFilename,
  );
  private readonly buildVersion = packageInfo.version;
  private readonly context: string;

  constructor(ctx?: string) {
    this.context = ctx;
    this.ensureLogDirectoryExists();

    const customLogFormat = winston.format.printf(({ level, message }) => {
      const timestamp = moment().format(this.logDateFormat);
      const buildInfo = `[Build] ${this.buildVersion}`;
      const contextInfo = `[${this.context || 'None'}]`;
      const logLevel = `[${level}]`;

      return `${buildInfo} - ${timestamp} ${logLevel} ${contextInfo} \t${message}`;
    });

    this.logger = winston.createLogger({
      level: this.logLevel,
      format: winston.format.combine(customLogFormat),
      transports: [
        //Format configuration for terminal or console logs
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            customLogFormat,
          ),
        }),
        //Format configuration for logs file (all type of logs including error) in a specific folder. ex: <ROOT_DIR>/logs/<filename>.log
        new winston.transports.File({
          filename: this.logFilename,
          format: customLogFormat,
        }),

        //Format configuration for logs file in a specific folder. ex: <ROOT_DIR>/logs/<filename>.log
        new winston.transports.File({
          filename: this.errorLogFilename,
          level: 'error', // Only log errors to this file
          format: customLogFormat,
        }),
      ],
    });
  }

  private ensureLogDirectoryExists() {
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }
  }

  log(message: string) {
    this.logger.info(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: any, error?: any) {
    this.logger.error(error ? `${message} - ${error}` : `${message}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  enter(context: string) {
    this.logger.info(`Enter In: ${context} method`);
  }

  exit(context: string) {
    this.logger.info(`Exit From: ${context} method`);
  }
}
