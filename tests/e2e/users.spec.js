import { test, expect } from '@playwright/test';
import { registerUser, loginUser } from './utils/auth.utils';
import UsersPO from './page-objects/users.po';
import HeaderPO from './page-objects/header.po';
import dotenv from 'dotenv'

dotenv.config();
let usersPO;
let headerPO

test.beforeEach(async ({ page }) => {
    await test.step('Login Admin user', async () => {
        await loginUser(page, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    })

    await test.step('Go to Users page', async () => {
        usersPO = new UsersPO(page);
        headerPO = new HeaderPO(page);
        await page.goto('/users-table');
    })
})

test('Users page loads successfully', async ({ page }) => {
    await test.step('Verify the table is visible', async () => {
        await page.goto('/users-table');
        await expect(usersPO.usersTable).toBeVisible();
    });
});

test('Assign new role to a user', async ({ page }) => {
    let email;
    let password;

    await test.step('Register new user via API', async () => {
        const result = await registerUser(page);
        email = result.email;
        password = result.password;
    });

    await test.step('Log in admin user', async () => {
        await loginUser(page, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
        await page.goto('/users-table');
    });

    await test.step('Verify the table is visible', async () => {
        await expect(usersPO.usersTable).toBeVisible();
        await expect(usersPO.userRows.first()).toBeVisible();
    });

    await test.step('Select a new role for the selected user', async () => {
        await usersPO.selectOption(email, { label: 'Admin' });
        await headerPO.toaster.filter({ hasText: 'Role updated successfully!' }).waitFor({ state: 'visible' });
    });

    await test.step('Logout and login the user with new role', async () => {
        await headerPO.logoutButton.click();
        await loginUser(page, email, password);
        await page.goto('/exhibition-list');
    });

    await test.step('Check header shows updated role', async () => {
        await expect(headerPO.header).toContainText('Users');
        await expect(headerPO.header).toContainText('Reports');
    });
});