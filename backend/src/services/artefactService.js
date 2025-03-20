const artefactRepository = require('../repositories/artefactRepository');

const artefactService = {
    async uploadArtefact(exhibitionId, artefactData) {
        if (!artefactData.title || !artefactData.file) {
            throw new Error('Artefact title and file are required.');
        }
        return await artefactRepository.addArtefact(exhibitionId, artefactData);
    },

    async getArtefactsbyExhibition(exhibitionId) {
        return await artefactRepository.findArtefactsByExhibition(exhibitionId);
    },

    async getArtefactById(artefactId) {
        const artefact = await artefactRepository.findArtefactById(artefactId);
        if (!artefact) {
            throw new Error('Artefact not found.');
        }
        return artefact;
    },

    async addFavorite(userId, artefactId) {
        return await artefactRepository.addFavorite(userId, artefactId);
    },

    async removeFavorite(userId, artefactId) {
        return await artefactRepository.removeFavorite(userId, artefactId);
    },

    async isFavorite(userId, artefactId) {
        return await artefactRepository.findFavorite(userId, artefactId);
    },

    async addReport(userId, artefactId, reason) {
        return await artefactRepository.addReport(userId, artefactId, reason);
    },
};

module.exports = artefactService;