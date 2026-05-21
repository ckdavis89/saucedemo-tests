import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.use({ storageState: 'storageState.json' });

test.describe('Network resilience', () => {
  test('inventory renders correctly when images fail to load', async ({ page }) => {
    await page.route('**/*.{jpg,jpeg,png,gif,webp}', route => route.abort());

    await page.goto('/inventory.html');
    const inventory = new InventoryPage(page);

    await expect(inventory.inventoryList).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(inventory.firstItemName).toBeVisible();
  });

  test('checkout completes when product images fail to load', async ({ page }) => {
    await page.route('**/*.{jpg,jpeg,png,gif,webp}', route => route.abort());

    await page.goto('/inventory.html');
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addToCart('sauce-labs-backpack');
    await inventory.goToCart();
    await cart.checkout();
    await checkout.fillInfo('John', 'Doe', '12345');
    await checkout.finish();

    await expect(checkout.confirmationHeader).toHaveText('Thank you for your order!');
  });
});
