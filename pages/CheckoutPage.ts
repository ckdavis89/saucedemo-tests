import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly confirmationHeader: Locator;

  constructor(private page: Page) {
    this.confirmationHeader = page.locator('[data-test="complete-header"]');
  }

  async fillInfo(firstName: string, lastName: string, zip: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }
}
