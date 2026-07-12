import { Page, expect } from "@playwright/test";


export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
    await this.page.click("#login-button");
  }

  async validateLogin(){
    await expect(this.page).toHaveURL(/inventory/);

  }

  async validateErrorMessage(expectedMessage: string) {
    await expect(
        this.page.locator("[data-test='error']")
    ).toContainText(expectedMessage);
}

}
