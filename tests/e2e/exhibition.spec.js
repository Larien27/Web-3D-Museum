import { test, expect } from '@playwright/test';
import { registerUser, loginUser } from './utils/auth.utils';
import ExhibitionPO from './page-objects/exhibition.po';

let exhibitionPO;

test.beforeEach(async ({ page }) => {
    await test.step('Register and login user via API', async () => {
        const { email, password } = await registerUser(page);
        await loginUser(page, email, password);
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

test('Create exhibition successfully', async () => {
    await test.step('Fill in the form and click create button', async () => {
        await exhibitionPO.titleInput.fill('');
        await exhibitionPO.descriptionInput.fill('Some test description.');
    });
    await test.step('Verify the button is visible', async () => {
        await expect(exhibitionPO.createButton).toBeVisible();
    });
});