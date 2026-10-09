// @ts-check
const { defineConfig } = require('@playwright/test');
const { baseURL } = require('./src/config/api.config');

module.exports = defineConfig({
  testDir: './tests/api',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
  ],
  use: {
    baseURL,
    extraHTTPHeaders: { Accept: 'application/json' },
    trace: 'on-first-retry',
    requestTimeout: 15000,
  },
  timeout: 30000,
});

