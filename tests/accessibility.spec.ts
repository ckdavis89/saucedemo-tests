import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Result } from 'axe-core';

test.use({ storageState: 'storageState.json' });

function checkAccessibility(violations: Result[]) {
  const serious = violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
  console.log(`Accessibility violations: ${violations.length} total, ${serious.length} critical/serious`);
  if (violations.length > 0) {
    console.table(violations.map(v => ({ impact: v.impact, id: v.id, help: v.help })));
  }
  expect(serious, `${serious.length} critical/serious violation(s) found`).toHaveLength(0);
}

test.describe('Accessibility', () => {
  test('login page has no critical/serious accessibility violations', async ({ page }) => {
    await page.goto('/');
    const { violations } = await new AxeBuilder({ page }).analyze();
    checkAccessibility(violations);
  });

  test('inventory page has no critical/serious accessibility violations', async ({ page }) => {
    await page.goto('/inventory.html');
    const { violations } = await new AxeBuilder({ page }).analyze();
    checkAccessibility(violations);
  });

  test('cart page has no critical/serious accessibility violations', async ({ page }) => {
    await page.goto('/cart.html');
    const { violations } = await new AxeBuilder({ page }).analyze();
    checkAccessibility(violations);
  });
});
