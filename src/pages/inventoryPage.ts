import { Page, expect } from "@playwright/test";

export class InventoryPage {
  constructor(private page: Page) {}

  async validateInventoryLoaded() {
    await expect(this.page.locator(".inventory_item")).toHaveCount(6);
  }

  async validateInventoryTitle() {
    await expect(this.page.locator("[data-test='title']")).toHaveText("Products");
  }

  async validateProductPrices() {
    const prices = this.page.locator(".inventory_item_price");
    await expect(prices).toHaveCount(6);
    await expect(prices).toHaveText("$");
    await expect(prices).toBeTruthy();
  }
}
