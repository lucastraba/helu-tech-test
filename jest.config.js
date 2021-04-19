const path = require('path');
module.exports = {
  clearMocks: true,
  coverageDirectory: '<rootDir>/tests/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/'
  ],
  moduleDirectories: [
    'node_modules',
    '.'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': '<rootDir>/tests/helpers/binaryFilesMapper',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  modulePathIgnorePatterns: ['<rootDir>/static'],
  rootDir: path.resolve(__dirname),
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  }
};
