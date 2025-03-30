const favoriteRepository = require('../repositories/favoriteRepository');

const favoriteService = {
    async addFavorite(userId, artefactId) {
        return await favoriteRepository.addFavorite(userId, artefactId);
    },

    async removeFavorite(userId, artefactId) {
        return await favoriteRepository.removeFavorite(userId, artefactId);
    },

    async isFavorite(userId, artefactId) {
        return await favoriteRepository.findFavorite(userId, artefactId);
    },
};

module.exports = favoriteService;