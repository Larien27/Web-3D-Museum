const exhibitionRepository = require('../repositories/exhibitionRepository');

const exhibitionService = {
    async createExhibition(exhibitionData, creatorId) {
        if (!exhibitionData.title || !exhibitionData.description) {
            throw new Error('Exhibition title and description are required.');
        }
        return await exhibitionRepository.createExhibition(exhibitionData, creatorId);
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

    async updateExhibition(exhibitionId, updatedData) {
        if (!updatedData.title || !updatedData.description) {
            throw new Error('Exhibition title and description are required.');
        }
        const exhibition = await exhibitionRepository.findExhibitionById(exhibitionId);
        if (!exhibition) {
            throw new Error('Exhibition not found.');
        }
        return await exhibitionRepository.updateExhibition(exhibitionId, updatedData);
    },
};

module.exports = exhibitionService;