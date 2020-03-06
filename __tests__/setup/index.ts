import 'jest';

jest.mock('react-native-reanimated', () =>
  // eslint-disable-line
  require('react-native-reanimated/mock'),
);

jest.mock('@react-native-community/async-storage', () =>
  require('@react-native-community/async-storage/jest/async-storage-mock'),
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
