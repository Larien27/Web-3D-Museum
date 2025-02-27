import { test, expect } from '@playwright/test';
import RegistrationPO from './page-objects/registration.po';

let registrationPO;

test.beforeEach(async ({ page }) => {
    registrationPO = new RegistrationPO(page);
  await page.goto('/registration');
});

test('Registration page loads successfully', async () => {
  await test.step('Verify the page title is visible', async () => {
    await expect(registrationPO.registrationTitle).toBeVisible();
  });
  await test.step('Verify all the inputs are visible', async () => {
    await expect(registrationPO.usernameInput).toBeVisible();
    await expect(registrationPO.emailInput).toBeVisible();
    await expect(registrationPO.passwordInput).toBeVisible();
    await expect(registrationPO.registerButton).toBeVisible();
  });
});