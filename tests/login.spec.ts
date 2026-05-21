import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const PASSWORD = 'secret_sauce';
const INVENTORY_URL = 'https://www.saucedemo.com/inventory.html';
const LOCKED_ERROR = 'Epic sadface: Sorry, this user has been locked out.';

test.describe('Login validation', () => {
  const successUsers = [
    'standard_user',
    'problem_user',
    'error_user',
    'visual_user',
  ];

  for (const username of successUsers) {
    test(`${username} logs in successfully`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(username, PASSWORD);
      await expect(page).toHaveURL(INVENTORY_URL);
      await expect(new InventoryPage(page).inventoryList).toBeVisible();
    });
  }

  test('performance_glitch_user logs in successfully (slow)', async ({ page }) => {
    test.setTimeout(30_000);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('performance_glitch_user', PASSWORD);
    await expect(page).toHaveURL(INVENTORY_URL);
    await expect(new InventoryPage(page).inventoryList).toBeVisible();
  });

  test('locked_out_user sees locked-out error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(LOCKED_ERROR);
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
