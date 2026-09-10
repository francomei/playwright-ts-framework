import { test, expect } from '@playwright/test';

test('Juice Shop loads successfully', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/OWASP Juice Shop/);
});