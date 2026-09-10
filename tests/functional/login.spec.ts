import { test, expect } from '@playwright/test';
import { JuiceShopLoginPage } from '../../src/pages/juiceShopLoginPage';

test('TC-001 - Login válido', async ({ page }) => {
  const loginPage = new JuiceShopLoginPage(page);
  const email = process.env.TEST_USER_EMAIL!;
  const password = process.env.TEST_USER_PASSWORD!;


  await loginPage.navigate();
  await loginPage.openLogin();
  await loginPage.login(email, password);

  await expect(page.getByText(/your basket/i)).toBeVisible();
});

test('TC-002 - Login inválido', async ({ page }) => {
  const loginPage = new JuiceShopLoginPage(page);

  await loginPage.navigate();
  await loginPage.openLogin();
  await loginPage.login(
    process.env.TEST_USER_EMAIL!,
    'wrongPassword123'
  );

  await expect(page.getByText('Invalid email or password.')).toBeVisible();
  
});