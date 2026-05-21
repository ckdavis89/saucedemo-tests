import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.use({ storageState: 'storageState.json' });

test.describe('Inventory sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  const sortCases: { label: string; value: 'az' | 'za' | 'lohi' | 'hilo'; firstItem: string }[] = [
    { label: 'Name (A to Z)',       value: 'az',   firstItem: 'Sauce Labs Backpack' },
    { label: 'Name (Z to A)',       value: 'za',   firstItem: 'Test.allTheThings() T-Shirt (Red)' },
    { label: 'Price (low to high)', value: 'lohi', firstItem: 'Sauce Labs Onesie' },
    { label: 'Price (high to low)', value: 'hilo', firstItem: 'Sauce Labs Fleece Jacket' },
  ];

  for (const { label, value, firstItem } of sortCases) {
    test(`sorts by ${label}`, async ({ page }) => {
      const inventory = new InventoryPage(page);
      await inventory.sortBy(value);
      await expect(inventory.firstItemName).toHaveText(firstItem);
    });
  }
});

test.describe('Inventory visual regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('inventory page matches snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('inventory.png', { fullPage: true });
  });
});
