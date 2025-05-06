class UsersPO {
    constructor(page) {
        this.page = page;

        this.usersTable = page.locator('#users-table');
        this.selectInput = (index) => page.locator('select').nth(index);
        this.selectOption = (rowText, option) => page.locator('tr', { hasText: rowText }).locator('select').selectOption(option);
        this.userRows = page.locator('#users-table tr');
    }
}

module.exports = UsersPO;