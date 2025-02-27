class LoginPO {
    constructor(page) {
        this.page = page;

        this.loginTitle = page.locator('h1');
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
    }
}

module.exports = LoginPO;