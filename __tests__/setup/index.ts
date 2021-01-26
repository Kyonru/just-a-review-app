import 'jest';

jest.mock('react-native-reanimated', () =>
  // eslint-disable-line
  require('react-native-reanimated/mock'),
);

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-get-random-values', () => ({
  getRandomBase64: () => 1,
}));

jest.mock('react-native/Libraries/LogBox/LogBox', () => ({
  ignoreAllLogs: (value: boolean) => value,
}));

const mockComponent = jest.fn().mockImplementation(() => ({
  render: () => '',
}));

jest.mock('@react-navigation/drawer', () => {
  return {
    createDrawerNavigator: jest.fn().mockImplementation(() => {
      return {
        Navigator: mockComponent,
        Screen: mockComponent,
      };
    }),
  };
});

jest.mock('@react-native-community/push-notification-ios', () => {
  return {
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(() => Promise.resolve()),
    getInitialNotification: jest.fn(() => Promise.resolve()),
  };
});

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockImplementationOnce(() => Promise.resolve()),
    show: jest.fn().mockImplementationOnce(() => Promise.resolve()),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});

jest.mock('react-native-localize', () => {
  const getLocales = () => [
    // you can choose / add the locales you want
    {
      countryCode: 'US',
      languageTag: 'en-US',
      languageCode: 'en',
      isRTL: false,
    },
    {
      countryCode: 'FR',
      languageTag: 'fr-FR',
      languageCode: 'fr',
      isRTL: false,
    },
  ];

  // use a provided translation, or return undefined to test your fallback
  const findBestAvailableLanguage = () => ({
    languageTag: 'en-US',
    isRTL: false,
  });

  const getNumberFormatSettings = () => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  });

  const getCalendar = () => 'gregorian'; // or "japanese", "buddhist"
  const getCountry = () => 'US'; // the country code you want
  const getCurrencies = () => ['USD', 'EUR']; // can be empty array
  const getTemperatureUnit = () => 'celsius'; // or "fahrenheit"
  const getTimeZone = () => 'Europe/Paris'; // the timezone you want
  const uses24HourClock = () => true;
  const usesMetricSystem = () => true;

  const addEventListener = jest.fn();
  const removeEventListener = jest.fn();

  return {
    findBestAvailableLanguage,
    getLocales,
    getNumberFormatSettings,
    getCalendar,
    getCountry,
    getCurrencies,
    getTemperatureUnit,
    getTimeZone,
    uses24HourClock,
    usesMetricSystem,
    addEventListener,
    removeEventListener,
  };
});
