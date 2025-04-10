const exhibitionRepository = require('../repositories/exhibitionRepository');
const exhibitionModel = require('../models/exhibitionModel');


const exhibitionService = {
    async createExhibition(exhibitionData, creatorId) {
        const validation = exhibitionModel.validateExhibition(exhibitionData);
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
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
        const validation = exhibitionModel.validateExhibition(updatedData);
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }

        const exhibition = await exhibitionRepository.findExhibitionById(exhibitionId);
        if (!exhibition) {
            throw new Error('Exhibition not found.');
        }
        return await exhibitionRepository.updateExhibition(exhibitionId, updatedData);
    },

    async deleteExhibition(exhibitionId) {
        const exhibition = await exhibitionRepository.findExhibitionById(exhibitionId);
        if (!exhibition) {
            throw new Error('Exhibition not found.');
        }
        return await exhibitionRepository.deleteExhibition(exhibitionId);
    }
};

module.exports = exhibitionService;