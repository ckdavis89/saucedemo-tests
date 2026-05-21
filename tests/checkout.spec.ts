import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.use({ storageState: 'storageState.json' });

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('completes a full purchase', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addToCart('sauce-labs-backpack');
    await expect(inventory.cartBadge).toHaveText('1');

    await inventory.goToCart();
    await expect(cart.cartItems).toHaveCount(1);

    await cart.checkout();
    await checkout.fillInfo('John', 'Doe', '12345');
    await checkout.finish();

    await expect(checkout.confirmationHeader).toHaveText('Thank you for your order!');
  });

  test('cart badge updates when adding multiple items', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addToCart('sauce-labs-backpack');
    await inventory.addToCart('sauce-labs-bike-light');

    await expect(inventory.cartBadge).toHaveText('2');
  });

  test('cart is empty before adding items', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await expect(inventory.cartBadge).not.toBeVisible();
  });
});
