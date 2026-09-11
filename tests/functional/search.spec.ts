import { test, expect } from '@playwright/test';
import { JuiceShopLoginPage } from '../../src/pages/juiceShopLoginPage';

test('TC-003 - Buscar un producto', async ({ page }) => {
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

test('TC-004 - Agregar producto al carrito', async ({ page }) => {
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

  await page.getByRole('button', { name: 'Add to Basket' }).first().click();

  await page.getByRole('button', { name: /Show the shopping cart/i }).click();

  await expect(page.getByText('Apple Juice').first()).toBeVisible();
});