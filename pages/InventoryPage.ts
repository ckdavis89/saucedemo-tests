import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly inventoryList: Locator;
  readonly cartBadge: Locator;
  readonly firstItemName: Locator;

  constructor(private page: Page) {
    this.inventoryList = page.locator('.inventory_list');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.firstItemName = page.locator('.inventory_item_name').first();
  }

  async addToCart(itemSlug: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemSlug}"]`).click();
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(value);
  }
}
