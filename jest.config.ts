import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './src/framework/jest/globalSetup.ts',
  globalTeardown: './src/framework/jest/globalTeardown.ts',
  setupFiles: ['./src/framework/jest/setupFiles.ts'],
  setupFilesAfterEnv: ['./src/framework/jest/setupFilesAfterEnv.ts'],
};

export default config;
