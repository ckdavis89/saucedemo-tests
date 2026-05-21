import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly cartItems: Locator;

  constructor(private page: Page) {
    this.cartItems = page.locator('.cart_item');
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
