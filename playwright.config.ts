import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { ENV } from './utils/env';

dotenv.config();

export default defineConfig({
  globalSetup: './global-setup.js',

  timeout: 120000,

  use: {
    baseURL: ENV.BASE_URL,
    headless: ENV.HEADLESS,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    viewport: ENV.HEADLESS ? { width: 1920, height: 1080 } : null,
    launchOptions: {
      args: [
        '--start-maximized',
        '--window-position=0,0',
        `--window-size=${1920},${1080}`,
      ],
    },

    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    },
  ],

  reporter: [['allure-playwright']],
});
