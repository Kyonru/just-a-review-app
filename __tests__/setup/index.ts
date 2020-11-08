import 'jest';

jest.mock('react-native-reanimated', () =>
  // eslint-disable-line
  require('react-native-reanimated/mock'),
);

jest.mock('@react-native-community/async-storage', () =>
  require('@react-native-community/async-storage/jest/async-storage-mock'),
);


jest.mock('react-native-get-random-values', () =>
  ({
    getRandomBase64: () => 1,
  }),
);


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
