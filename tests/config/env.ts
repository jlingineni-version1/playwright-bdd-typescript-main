type Env = 'dev' | 'test' | 'prod';

const URLS: Record<Env, string> = {
  dev: 'https://connectivity-tool-lite-dev.dft.gov.uk/',
  test: 'https://connectivity-tool-lite-test.dft.gov.uk/',
  prod: 'https://connectivity-tool-lite.dft.gov.uk/',
};

// Default = test
const env = (process.env.ENV as Env) || 'test';

export const BASE_URL = URLS[env];
export const CURRENT_ENV = env;
