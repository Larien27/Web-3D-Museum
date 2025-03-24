class ExhibitionPO {
    constructor(page) {
        this.page = page;

        this.titleInput = page.locator('#exhibitionTitle');
        this.descriptionInput = page.locator('#exhibitionDescription');
        this.createButton = page.locator('button[type="submit"]');
    }
}

module.exports = ExhibitionPO;