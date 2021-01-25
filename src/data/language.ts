export const defaultLanguage = {
  languageCode: 'en',
  languageTag: 'en',
  countryCode: 'US',
  isRTL: false,
};

export const AvailableLanguages = [
  {
    label: 'English',
    value: {
      languageCode: 'en',
      languageTag: 'en',
      isRTL: false,
    },
  },
  {
    label: 'Español',
    value: {
      languageCode: 'es',
      languageTag: 'es',
      isRTL: false,
    },
  },
];

export default {
  es: 'Español',
  en: 'English',
} as { [key: string]: string };
