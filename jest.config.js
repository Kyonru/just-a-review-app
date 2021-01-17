module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './__tests__/setup/index.ts',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/data/mock/mockFile.ts',
  },
  modulePathIgnorePatterns: ['<rootDir>/__tests__/setup/index.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!@react-native-picker|react-native|@react-native-community|@sentry/react-native)',
  ],
};
