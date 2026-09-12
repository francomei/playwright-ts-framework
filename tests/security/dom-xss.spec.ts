import { test, expect } from '@playwright/test';

test('DOM-XSS - Search Alert', async ({ page }) => {
  let xssTriggered = false;

  page.on('dialog', async dialog => {
    xssTriggered = true;
    await dialog.dismiss();
  });

  await page.goto('/');

  await page.locator('.search-area mat-icon').first().click();

  const searchInput = page.getByRole('textbox');

  await searchInput.fill('<iframe src="javascript:alert(`xss`)">');
  await searchInput.press('Enter');

  await page.waitForTimeout(1000);

  expect(xssTriggered).toBe(false);
});