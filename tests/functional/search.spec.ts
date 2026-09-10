import { test, expect } from '@playwright/test';
import { JuiceShopLoginPage } from '../../src/pages/juiceShopLoginPage';

test('Buscar un producto', async ({ page }) => {
  const loginPage = new JuiceShopLoginPage(page);
  const email = process.env.TEST_USER_EMAIL!;
  const password = process.env.TEST_USER_PASSWORD!;

  const search = page.getByPlaceholder('Search');

  await loginPage.navigate();
  await loginPage.openLogin();
  await loginPage.login(email, password);


  await page.locator('#searchQuery').click();
  await page.getByRole('textbox').fill('Apple');
  await page.getByRole('textbox').press('Enter');

  await expect(page.getByText('Apple').first()).toBeVisible();
});