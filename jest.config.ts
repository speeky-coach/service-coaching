import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './src/setup/jest/globalSetup.ts',
  globalTeardown: './src/setup/jest/globalTeardown.ts',
  setupFiles: ['./src/setup/jest/setupFiles.ts'],
  setupFilesAfterEnv: ['./src/setup/jest/setupFilesAfterEnv.ts'],
};

export default config;
