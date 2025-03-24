import { test, expect } from '@playwright/test';
import ExhibitionPO from './page-objects/exhibition.po';

let exhibitionPO;

test.beforeEach(async ({ page }) => {
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
    await test.step('Log the user via API', async () => {
        const loginResponse = await page.request.post('/api/users/login', {
            data: {
                email: email,
                password: password,
            },
        });
        await expect(loginResponse.ok()).toBeTruthy();

        const responseData = await loginResponse.json();
        const authToken = responseData.token;

        await page.addInitScript((token) => {
            localStorage.setItem('token', token);
        }, authToken);
        await page.reload();
    });

    await test.step('Go to Create Exhibition page', async () => {
        exhibitionPO = new ExhibitionPO(page);
        await page.goto('/create-exhibition');
    })
})

test('Create Exhibition page loads successfully', async () => {
    await test.step('Verify all the inputs are visible', async () => {
        await expect(exhibitionPO.titleInput).toBeVisible();
        await expect(exhibitionPO.descriptionInput).toBeVisible();
    });
    await test.step('Verify the button is visible', async () => {
        await expect(exhibitionPO.createButton).toBeVisible();
    });
});