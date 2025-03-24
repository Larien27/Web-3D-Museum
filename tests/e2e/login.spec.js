import { test, expect } from '@playwright/test';
import HeaderPO from './page-objects/header.po';
import LoginPO from './page-objects/login.po';
import { registerUser } from './utils/auth.utils';

let headerPO;
let loginPO;

test.beforeEach(async ({ page }) => {
    headerPO = new HeaderPO(page);
    loginPO = new LoginPO(page);
    await page.goto('/login');
});

test('Login page loads successfully', async () => {
    await test.step('Verify the page title is visible', async () => {
        await expect(loginPO.loginTitle).toBeVisible();
    });
    await test.step('Verify all the inputs are visible', async () => {
        await expect(loginPO.emailInput).toBeVisible();
        await expect(loginPO.passwordInput).toBeVisible();
        await expect(loginPO.loginButton).toBeVisible();
    });
});

test('Registered user logs in successfully', async ({ page }) => {
    const expectedNavTexts = ['Settings', 'Exhibition List', 'Manage Users', 'Reports List', 'Create Exhibition', 'Logout'];
    const { email, password } = await registerUser(page);

    await test.step('Log the user in', async () => {
        await loginPO.emailInput.fill(email);
        await loginPO.passwordInput.fill(password);
        await loginPO.loginButton.click();
    });
    await test.step('Verify the right navigation links appear', async () => {
        await page.waitForTimeout(3000);
        await expect(headerPO.header).toBeVisible();
        for (let i = 0; i < expectedNavTexts.length; i++) {
            const navLinkText = await headerPO.navLinks.nth(i).innerText();
            expect(navLinkText.toLowerCase()).toBe(expectedNavTexts[i].toLowerCase());
        }
    });
});