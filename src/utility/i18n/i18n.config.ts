import { MessageFormatter } from '@utility/exception';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { SimpleMessage } from './simple-message';
import { i18nFilePath } from './i18n.constant';
import { I18nYamlLoader } from './yaml.loader';

export const i18nModule = I18nModule.forRoot({
  fallbackLanguage: 'en',
  loader: I18nYamlLoader,
  loaderOptions: {
    path: i18nFilePath,
    watch: true,
  },
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
    new HeaderResolver(['x-lang']),
  ],
});

export const MessageFormatterProvider = {
  provide: MessageFormatter,
  useFactory: (simpleMessage: SimpleMessage) => {
    MessageFormatter.setSimpleMessageInstance(simpleMessage);
    return MessageFormatter;
  },
  inject: [SimpleMessage], //Injection is required to set the instance of SimpleMessage to the MessageFormatter
};

/**
 * SimpleMessage - Used as providers to provide the instance of SimpleMessage to injecting in the MessageFormatterProvider
 */
export const I18nProviders = [SimpleMessage, MessageFormatterProvider];
