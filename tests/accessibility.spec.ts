import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ storageState: 'storageState.json' });

test.describe('Accessibility', () => {
  test('login page has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('inventory page has no accessibility violations', async ({ page }) => {
    await page.goto('/inventory.html');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('cart page has no accessibility violations', async ({ page }) => {
    await page.goto('/cart.html');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
