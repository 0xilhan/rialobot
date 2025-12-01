import { test, expect } from '@playwright/test';

test('Rialo Bot UI renders correctly', async ({ page }) => {
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`Error text: "${msg.text()}"`);
    }
  });

  await page.goto('http://localhost:3001');

  // Wait for the h1 element to be visible
  await expect(page.locator('h1:has-text("Rialo Bot")')).toBeVisible({ timeout: 10000 });

  // Add a small delay to ensure rendering is complete
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'screenshot.png' });
});
