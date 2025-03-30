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

    async get3DModelsByExhibition(exhibitionId) {
        const artefacts = await artefactRepository.findArtefactsByExhibition(exhibitionId);

        return artefacts.filter(artefact => artefact.file_path).map(artefact => ({
            id: artefact.id,
            title: artefact.title,
            modelFileUrl: artefact.file_path
        }));
    },
};

module.exports = artefactService;