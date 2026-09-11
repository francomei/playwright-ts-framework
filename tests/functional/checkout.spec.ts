import { test, expect } from '@playwright/test';
import { JuiceShopLoginPage } from '../../src/pages/juiceShopLoginPage';

test('TC-005 - Completar checkout', async ({ page }) => {
  const loginPage = new JuiceShopLoginPage(page);
  const email = process.env.TEST_USER_EMAIL!;
  const password = process.env.TEST_USER_PASSWORD!;

  const search = page.getByPlaceholder('Search');

  await loginPage.navigate();
  await loginPage.openLogin();
  await loginPage.login(email, password);

  // Find product and add to basket
  await page.locator('#searchQuery').click();
  await page.getByRole('textbox').fill('Apple');
  await page.getByRole('textbox').press('Enter');
  
  await expect(page.getByText('Apple').first()).toBeVisible();
  
  await page.getByRole('button', { name: 'Add to Basket' }).first().click();
  
  await page.getByRole('button', { name: /Show the shopping cart/i }).click();
  
  await expect(page.getByText('Apple Juice').first()).toBeVisible();

  await page.getByRole('button', { name: /dismiss cookie message/i }).click();
  
  await page.locator('#checkoutButton').click();
  

  // Fill in address details
  await page.getByRole('button', { name: /Add a new address/i }).click();
  
  await page.getByPlaceholder('Country').fill('United States');
  await page.getByPlaceholder('Name').fill('John Doe');
  await page.getByPlaceholder('Mobile Number').fill('1234567890');
  await page.getByPlaceholder('Zip Code').fill('12345');
  await page.getByPlaceholder('Address').fill('123 Main Street');
  await page.getByPlaceholder('City').fill('New York');
  
  await page.waitForTimeout(3000);
  
  await page.locator('#submitButton').click();
  
  // Select address
  await page.getByRole('radio').first().check();
  await page.waitForTimeout(3000);
  
  await page.getByRole('button', { name: /Proceed to payment selection/i }).click();
  
  // Select delivery method
  await page.getByRole('row', { name: /Fast Delivery/i }).click();
  
  await page.getByRole('button', { name: /Proceed to delivery method selection/i }).click();
  
  await page.locator('#mat-expansion-panel-header-0').click();

  await page.getByText('Name').fill('John Doe');
  await page.getByText('Card Number').fill('2222333344445555');
  await page.getByRole('combobox', { name: /Expiry Month/i }).click();
    await page.getByRole('option', { name: '5' }).nth(1).click();

  await page.getByRole('combobox', { name: /Expiry Year/i }).click();
    await page.getByRole('option', { name: '2085' }).last().click();


});