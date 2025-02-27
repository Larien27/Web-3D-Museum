class HeaderPO {
    constructor(page) {
        this.page = page;

        this.header = page.locator('#header');
        this.navLinks = this.header.locator('li');
    }
}

module.exports = HeaderPO;