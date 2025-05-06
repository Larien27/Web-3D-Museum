class HeaderPO {
    constructor(page) {
        this.page = page;

        this.header = page.locator('#header');
        this.navLinks = this.header.locator('li');
        this.logoutButton = this.header.locator('button', { name: 'Log Out' });

        // Toaster
        this.toaster = page.locator('.toast');
    }
}

module.exports = HeaderPO;