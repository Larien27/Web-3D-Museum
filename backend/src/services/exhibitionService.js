const exhibitionRepository = require('../repositories/exhibitionRepository');

const exhibitionService = {
    async createExhibition(exhibitionData) {
        if (!exhibitionData.title || !exhibitionData.description) {
            throw new Error('Exhibition title and description are required.');
        }
        return await exhibitionRepository.createExhibition(exhibitionData);
    },

    async getAllExhibitions() {
        return await exhibitionRepository.findAllExhibitions();
    },

    async getExhibitionById(exhibitionId) {
        const exhibition = await exhibitionRepository.findExhibitionById(exhibitionId);
        if (!exhibition) {
            throw new Error('Exhibition not found.');
        }
        return exhibition;
    },
};

module.exports = exhibitionService;