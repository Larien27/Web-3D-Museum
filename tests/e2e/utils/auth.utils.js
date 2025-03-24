export async function registerUser(page) {
    const randomString = Math.random().toString(36).substring(2, 10);
    const username = `user_${randomString}`;
    const email = `user_${randomString}@example.com`;
    const password = `Password_${randomString}`;

    const registrationResponse = await page.request.post('/api/users/register', {
        data: {
            username: username,
            email: email,
            password: password,
        },
    });

    if (!registrationResponse.ok()) {
        throw new Error(`User registration failed: ${await registrationResponse.text()}`);
    }

    return { email, password };
}

export async function loginUser(page, email, password) {
    const loginResponse = await page.request.post('/api/users/login', {
        data: {
            email: email,
            password: password,
        },
    });
    
    if (!loginResponse.ok()) {
        throw new Error(`User login failed: ${await loginResponse.text()}`);
    }

    const responseData = await loginResponse.json();
    const authToken = responseData.token;

    await page.goto('/');

    await page.evaluate((token) => {
        localStorage.setItem('token', token);
    }, authToken);

    await page.reload();
}