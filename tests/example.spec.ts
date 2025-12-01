import { test, expect } from '@playwright/test';

test('homepage has expected content and layout', async ({ page }) => {
  page.on('console', msg => console.log(msg.text()));
  await page.goto('http://localhost:3000');
  await page.locator('h1').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('h1')).toHaveText('Rialo BotBETA');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
});
