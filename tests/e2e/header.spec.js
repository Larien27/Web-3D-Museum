import { test, expect } from '@playwright/test';
import HeaderPO from './page-objects/header.po';
import { registerUser, loginUser } from './utils/auth.utils';
import dotenv from 'dotenv';

dotenv.config();
let headerPO;

test.beforeEach(async ({ page }) => {
  headerPO = new HeaderPO(page);
  await page.goto('/');
});

test('Not-logged user has the right header links', async () => {
  const expectedNavTexts = ['Log In', 'Sign Up'];

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

test('Logged user has the right header links', async ({ page }) => {
  const expectedNavTexts = ['Exhibitions', 'Settings', 'Log Out'];

  await test.step('Create and log the user in', async () => {
    const { email, password } = await registerUser(page);
    await loginUser(page, email, password);
  });
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

test('Exhibitor user has the right header links', async ({ page }) => {
  const expectedNavTexts = ['Exhibitions', 'Settings', 'Log Out'];

  await test.step('Create and log the user in', async () => {
    await loginUser(page, process.env.EXHIBITOR_EMAIL, process.env.EXHIBITOR_PASSWORD);
  });
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

test.only('Admin user has the right header links', async ({ page }) => {
  const expectedNavTexts = ['Exhibitions', 'Users', 'Reports', 'Settings', 'Log Out'];

  await test.step('Create and log the user in', async () => {
    await loginUser(page, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  });
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