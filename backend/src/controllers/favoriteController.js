const favoriteService = require('../services/favoriteService');

const favoriteController = {
    async addFavorite(req, res) {
        try {
            const { artefactId } = req.params;
            const userId = req.user.id;
            await favoriteService.addFavorite(userId, artefactId);
            res.status(200).json({ message: 'Artefact added to favorites.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async removeFavorite(req, res) {
        try {
            const { artefactId } = req.params;
            const userId = req.user.id;
            await favoriteService.removeFavorite(userId, artefactId);
            res.status(200).json({ message: 'Artefact removed from favorites.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async isFavorite(req, res) {
        try {
            const { artefactId } = req.params;
            const userId = req.user.id;
            const favorite = await favoriteService.isFavorite(userId, artefactId);
            res.status(200).json({ isFavorite: favorite });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}

module.exports = favoriteController;