import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const AUTH_FILE = 'storageState.json';

setup('authenticate as standard_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.context().storageState({ path: AUTH_FILE });
});
