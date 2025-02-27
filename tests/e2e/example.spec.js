import { test, expect } from '@playwright/test';

test('Header loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[id="header"]')).toBeVisible();
});