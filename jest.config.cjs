/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};