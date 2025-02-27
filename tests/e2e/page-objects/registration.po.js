class RegistrationPO {
    constructor(page) {
        this.page = page;

        this.registrationTitle = page.locator('h1');
        this.usernameInput = page.locator('#username');
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.registerButton = page.locator('button[type="submit"]');
    }
}

module.exports = RegistrationPO;