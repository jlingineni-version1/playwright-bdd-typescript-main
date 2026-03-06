type Env = 'dev' | 'test' | 'prod';

const ENV_CONFIG: Record<Env, { BASE_URL: string;APP_URL: string;FULLPAGE_URL:string;MAP_URL:string,Accesibility_URL:string,Private_Policy_URL:string,Guidance_URL:string,Understand_Data_URL:string}> = {
  dev: {
    BASE_URL: 'https://connectivity-tool-lite-dev.dft.gov.uk',
    APP_URL: 'https://connectivity-tool-lite-dev.dft.gov.uk/app',
    FULLPAGE_URL:'https://connectivity-tool-lite-dev.dft.gov.uk/app#6/52.879/-0.47',
    MAP_URL:'https://connectivity-tool-lite-dev.dft.gov.uk/app#14/52.879/-0.47',
    Accesibility_URL:'https://connectivity-tool-lite-dev.dft.gov.uk/help/accessibility-statement',
    Private_Policy_URL:'https://connectivity-tool-lite-dev.dft.gov.uk/help/privacy-policy',
    Guidance_URL:'https://connectivity-tool-lite-dev.dft.gov.uk/help/guidance',
    Understand_Data_URL:'https://connectivity-tool-lite-dev.dft.gov.uk/help/understand-the-data'
  },
  test: {
    BASE_URL: 'https://connectivity-tool-lite-test.dft.gov.uk/',
    APP_URL: 'https://connectivity-tool-lite-test.dft.gov.uk/app',
    MAP_URL:'https://connectivity-tool-lite-test.dft.gov.uk/app#14/52.879/-0.47',
    FULLPAGE_URL:'https://connectivity-tool-lite-test.dft.gov.uk/app#6/52.879/-0.47',
    Accesibility_URL:'https://connectivity-tool-lite-test.dft.gov.uk/help/accessibility-statement',
    Private_Policy_URL:'https://connectivity-tool-lite-test.dft.gov.uk/help/privacy-policy',
    Guidance_URL:'https://connectivity-tool-lite-test.dft.gov.uk/help/guidance',
    Understand_Data_URL:'https://connectivity-tool-lite-test.dft.gov.uk/help/understand-the-data'
  },
  prod: {
    BASE_URL: 'https://connectivity-tool-lite.dft.gov.uk/',
    APP_URL: 'https://connectivity-tool-lite.dft.gov.uk/app',
    FULLPAGE_URL:'https://connectivity-tool-lite.dft.gov.uk/app#6/52.879/-0.47',
    MAP_URL:'https://connectivity-tool-lite.dft.gov.uk/app#14/52.879/-0.47',
    Accesibility_URL:'https://connectivity-tool-lite.dft.gov.uk/help/accessibility-statement',
    Private_Policy_URL:'https://connectivity-tool-lite.dft.gov.uk/help/privacy-policy',
    Guidance_URL:'https://connectivity-tool-lite.dft.gov.uk/help/guidance',
    Understand_Data_URL:'https://connectivity-tool-lite.dft.gov.uk/help/understand-the-data'
  },
};

// Default = test
const env = (process.env.ENV as Env) || 'test';

// Export URLs
export const BASE_URL = ENV_CONFIG[env].BASE_URL;
export const APP_URL = ENV_CONFIG[env].APP_URL;
export const FULLPAGE_URL=ENV_CONFIG[env].FULLPAGE_URL;
export const MAP_URL=ENV_CONFIG[env].MAP_URL;
export const Accesibility_URL=ENV_CONFIG[env].Accesibility_URL;
export const Private_Policy_URL=ENV_CONFIG[env].Private_Policy_URL;
export const Guidance_URL=ENV_CONFIG[env].Guidance_URL;
export const Understand_Data_URL=ENV_CONFIG[env].Understand_Data_URL;

// (Optional) export env name
export const CURRENT_ENV = env;
