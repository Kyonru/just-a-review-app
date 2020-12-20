import 'jest';

jest.mock('react-native-reanimated', () =>
  // eslint-disable-line
  require('react-native-reanimated/mock'),
);

jest.mock('@react-native-community/async-storage', () =>
  require('@react-native-community/async-storage/jest/async-storage-mock'),
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
