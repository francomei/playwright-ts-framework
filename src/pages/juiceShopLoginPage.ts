import { Page } from '@playwright/test';

export class JuiceShopLoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async openLogin() {
  await this.page.getByText('Dismiss').click();
  await this.page.getByText(' account_circle ').click();
  await this.page.locator('.mat-mdc-menu-item-text').click();
  // await this.page.getByRole('button', { name: 'Login' }).click();
}

  async login(email: string, password: string) {
    await this.page.locator('#email').fill(email);
    await this.page.locator('#password').fill(password);
    await this.page.getByRole('button', { name: /login/i }).first().click();
  }
}