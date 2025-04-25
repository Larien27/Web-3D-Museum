const exhibitionService = require('../services/exhibitionService');

const exhibitionController = {
    async createExhibition(req, res) {
        try {
            const creatorId = req.user.id;
            const exhibition = await exhibitionService.createExhibition(req.body, creatorId);
            res.status(201).json({ message: 'Exhibition created successfully.', exhibitionId: exhibition.id });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getAllExhibitions(req, res) {
        try {
            const exhibitions = await exhibitionService.getAllExhibitions();
            res.status(200).json(exhibitions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getExhibitionById(req, res) {
        try {
            const exhibition = await exhibitionService.getExhibitionById(req.params.exhibitionId);
            res.status(200).json(exhibition);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    async updateExhibition(req, res) {
        try {
            const updatedExhibition = await exhibitionService.updateExhibition(req.params.exhibitionId, req.body, req.user);
            res.status(200).json({ message: 'Exhibition updated successfully.', updatedExhibition });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteExhibition(req, res) {
        try {
            await exhibitionService.deleteExhibition(req.params.exhibitionId, req.user);
            res.status(200).json({ message: 'Exhibition deleted successfully'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = exhibitionController;