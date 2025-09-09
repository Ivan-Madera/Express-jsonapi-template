import { type Config } from 'jest'

const config: Config = {
  clearMocks: true,
  coverageProvider: 'babel',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  roots: ['<rootDir>'],
  testMatch: ['**/tests/**/*.spec.[jt]s?(x)', '**/tests/**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/src/tests/setup.ts', '/src/tests/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testTimeout: 30000,
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  setupFiles: ['<rootDir>/src/tests/jest.setup.ts'],
  forceExit: true,
  detectOpenHandles: true,
  testEnvironment: 'node'
}

export default config
