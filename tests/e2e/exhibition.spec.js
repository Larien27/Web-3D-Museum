import { test, expect } from '@playwright/test';
import { registerUser, loginUser } from './utils/auth.utils';
import ExhibitionPO from './page-objects/exhibition.po';
import dotenv from 'dotenv'

dotenv.config();
let exhibitionPO;

test.beforeEach(async ({ page }) => {
    await test.step('Login Exhibitor user', async () => {
        await loginUser(page, process.env.EXHIBITOR_EMAIL, process.env.EXHIBITOR_PASSWORD);
    })

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

test('Create exhibition successfully', async ({ page }) => {
    const randomString = Math.random().toString(36).substring(2, 10);
    const title = `Exhibition ${randomString}`;
    const description = `Test description for ${title}`;

    await test.step('Fill in the form and click create button', async () => {
        await exhibitionPO.titleInput.fill(title);
        await exhibitionPO.descriptionInput.fill(description);
        await exhibitionPO.createButton.click();
    });
    
    await test.step('Go to Exhibition List page', async () => {
        await page.waitForNavigation();
        await page.goto('/exhibition-list');
    });
    await test.step('Verify the new exhibition is displayed', async () => {
        await page.waitForSelector('#exhibition-list');
        const isExhibitionVisible = await page.locator(`text=${title}`).first().isVisible();
        expect(isExhibitionVisible).toBeTruthy();
    });
});