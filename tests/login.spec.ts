import { test } from "@playwright/test";
import { LoginPage } from "../src/pages/loginPage";

test("Login exitoso", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login("standard_user", "secret_sauce");

  await loginPage.validateLogin();
});

test("Locked user cannot login", async ({ page }) => {
  const login = new LoginPage(page);

  await login.navigate();

  await login.login("locked_out_user", "secret_sauce");

  await login.validateErrorMessage("Sorry, this user has been locked out.");
});

test("Login with invalid credentials", async ({ page }) => {
  const login = new LoginPage(page);

  await login.navigate();

  await login.login("invalid_user", "invalid_password");

  await login.validateErrorMessage(
    "Username and password do not match any user in this service",
  );
});
