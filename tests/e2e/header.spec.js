import { test, expect } from '@playwright/test';
import HeaderPO from './page-objects/header.po';

let headerPO;

test.beforeEach(async ({ page }) => {
  headerPO = new HeaderPO(page);
  await page.goto('/');
});

test('Header loads successfully', async () => {
  const expectedNavTexts = ['Login', 'Registration'];

  await test.step('Verify the header is visible', async () => {
    await expect(headerPO.header).toBeVisible();
  });
  await test.step('Verify the right navigation links appear', async () => {
    for (let i = 0; i < expectedNavTexts.length; i++) {
      const navLinkText = await headerPO.navLinks.nth(i).innerText();
      expect(navLinkText.toLowerCase()).toBe(expectedNavTexts[i].toLowerCase());
    }
  });
});