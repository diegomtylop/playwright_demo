import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';
import "dotenv/config"

const now = new Date();
const date = now.toISOString().split('T')[0]; // Date part (YYYY-MM-DD)
const reportFileName = `cucumber-report/report_${date}.html`;

const testDir = defineBddConfig({
  features: ['Playwright/features/**/*.feature'],
  steps: ['Playwright/steps/*.ts','Playwright/hooks/*.ts'],
  missingSteps: 'fail-on-gen'
});

export default defineConfig({
  use: {
    permissions: ['geolocation'],
    geolocation: { latitude: 0, longitude: 0 }, // Set to a neutral location if needed
    headless: false,
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10000,
    baseURL: process.env.BASE_URL
  },
  testDir,
  retries: 1,
  timeout: 60 * 1000,//minutes expressed in milliseconds
  expect: {timeout:9000},
  reporter: [
    cucumberReporter('html', { outputFile: reportFileName })
  ],
  fullyParallel: false,
  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null
      }
    },
    //todo: add more projects
  ]
});
