/* eslint-disable global-require */
import moment from 'moment';
import 'moment/locale/es';

import React from 'react';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import { LanguageSource } from 'src/@types/services';
import { defaultLanguage } from 'src/data/language';

const translationGetters: { [key: string]: any } = {
  // lazy requires
  es: () => require('./translations/spanish.json'),
  en: () => require('./translations/english.json'),
};

export const translate = memoize(
  (key: string, config: any) => i18n.t(key, config),
  (key: string, config: any) => (config ? key + JSON.stringify(config) : key),
);

export const updateLanguage = (languague: RNLocalize.Locale) => {
  const { languageTag, isRTL } = languague;
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // // set i18n-js config
  i18n.translations = {
    [languageTag]: translationGetters[languageTag](),
  };
  i18n.locale = languageTag;
  moment.locale(languageTag);
};

export const Init = (): Partial<RNLocalize.Locale> => {
  // fallback if no available language fits
  const fallback = defaultLanguage;

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {
    [languageTag]: translationGetters[languageTag](),
  };
  i18n.locale = languageTag;
  moment.locale(languageTag);
  return { languageTag, isRTL };
};

export const LocalizationContext = React.createContext({
  translate,
  strings: LanguageSource,
  locale: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocale: (locale: any) => {},
});
