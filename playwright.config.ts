import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  expect: {
    timeout: 30000,
  },
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-small',
      use: { ...devices['iPhone SE'] },
    },
    {
      name: 'mobile-large',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'tablet',
      use: { ...devices['iPad Pro 11'] },
    },
    {
      name: 'desktop-half',
      use: { viewport: { width: 960, height: 1080 } },
    },
    {
      name: 'desktop-1080',
      use: { viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'desktop-1440',
      use: { viewport: { width: 2560, height: 1440 } },
    },
    {
      name: 'ultrawide',
      use: { viewport: { width: 3440, height: 1440 } },
    },
  ],
  webServer: {
    command: 'npm run dev -- -p 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});