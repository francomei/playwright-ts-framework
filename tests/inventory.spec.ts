import { test } from "@playwright/test";
import { LoginPage } from "../src/pages/loginPage";
import { InventoryPage } from "../src/pages/inventoryPage";

test("Inventory is displayed after login", async ({ page }) => {
  const login = new LoginPage(page);

  const inventory = new InventoryPage(page);

  await login.navigate();

  await login.login("standard_user", "secret_sauce");

  await inventory.validateInventoryLoaded();
});

test("Inventory have title 'Products' after login", async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.navigate();
  await login.login("standard_user", "secret_sauce");

  await inventory.validateInventoryTitle();
});

test("Products have price", async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.navigate();
  await login.login("standard_user", "secret_sauce");
  await inventory.validateProductPrices();
});

