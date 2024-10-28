/* eslint-disable @typescript-eslint/no-explicit-any */
import { I18nLoader } from 'nestjs-i18n';
import * as yaml from 'js-yaml';
import { readFileSync, readdirSync } from 'fs';
import * as path from 'path';
import { i18nFileExtension, i18nFilePath } from './i18n.constant';
import { AppLogger } from '@utility/logger';

export class I18nYamlLoader extends I18nLoader {
  private readonly logger = new AppLogger(I18nYamlLoader.name);

  public async languages(): Promise<string[]> {
    this.logger.enter(this.languages.name);

    const files = this.getTranslationFiles();
    this.logger.debug(`files: ${JSON.stringify(files)}`);
    const list = files.map((file) => file.replace('.yaml', ''));

    this.logger.debug(`List of languages: ${JSON.stringify(list)}`);
    this.logger.exit(this.languages.name);
    return list;
  }

  public async load(): Promise<Record<string, Record<string, any>>> {
    this.logger.enter(this.load.name);
    const translations: Record<string, Record<string, any>> = {};

    const files = this.getTranslationFiles();

    this.logger.debug(`files: ${JSON.stringify(files)}`);

    for (const file of files) {
      const filePath = path.join(i18nFilePath, file);

      this.logger.debug(`filePath: ${filePath}`);

      const locale = file.replace(i18nFileExtension, '');

      this.logger.debug(`locale: ${locale}`);

      const content = yaml.load(readFileSync(filePath, 'utf8')) as Record<
        string,
        any
      >;
      translations[locale] = content;
    }

    this.logger.debug(`translations: ${JSON.stringify(translations)}`);
    this.logger.exit(this.load.name);

    return translations;
  }

  /**
   * Reads the translation files from the `i18nFilePath`
   * Returns the list of translation files
   * @returns string[]
   */
  private getTranslationFiles(): string[] {
    this.logger.enter(this.getTranslationFiles.name);

    const files = readdirSync(i18nFilePath).filter((file) =>
      file.endsWith(i18nFileExtension),
    );

    this.logger.debug(`files: ${JSON.stringify(files)}`);

    this.logger.exit(this.getTranslationFiles.name);
    return files;
  }
}
