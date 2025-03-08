import { test, expect } from '@playwright/test';
import HeaderPO from './page-objects/header.po';
import LoginPO from './page-objects/login.po';

let headerPO
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

test.only('Registered user logs in successfully', async ({ page }) => {
    const expectedNavTexts = ['Exhibition', 'Favourites', 'Settings', 'Exhibition List', 'Manage Users', 'Reports List', 'Create Exhibition', 'Logout'];
    const randomString = Math.random().toString(36).substring(2, 10);
    const username = `user_${randomString}`;
    const email = `user_${randomString}@example.com`;
    const password = `Password_${randomString}`;


    await test.step('Register the user via API', async () => {
        const registrationResponse = await page.request.post('/api/users/register', {
            data: {
                username: username,
                email: email,
                password: password,
            },
        });
        await expect(registrationResponse.ok()).toBeTruthy();
    });
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