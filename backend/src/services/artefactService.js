const artefactRepository = require('../repositories/artefactRepository');
const artefactModel = require('../models/artefactModel');

const artefactService = {
    async uploadArtefact(exhibitionId, artefactData) {
        const validation = artefactModel.validateArtefact(artefactData);
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }
        const fileValidation = artefactModel.validateFile(artefactData.file);
        if (fileValidation.error) {
            throw new Error(fileValidation.error.details[0].message);
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
            modelFileUrl: artefact.file_path,
            position: artefact.position,
            rotation: artefact.rotation,
            scale: artefact.scale,
        }));
    },

    async deleteArtefact(artefactId) {
        const artefact = await artefactRepository.findArtefactById(artefactId);
        if (!artefact) {
            throw new Error('Artefact not found.');
        }
        const exhibitionId = artefact.exhibition_id;
        await artefactRepository.deleteArtefact(artefact);
        return exhibitionId;
    },

    async updateArtefact(artefactId, artefactData) {
        const validation = artefactModel.validateArtefact(artefactData);
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }
        if (artefactData.file) {
            const fileValidation = artefactModel.validateFile(artefactData.file);
            if (fileValidation.error) {
                throw new Error(fileValidation.error.details[0].message);
            }
        }
        const artefact = await artefactRepository.findArtefactById(artefactId);
        if (!artefact) {
            throw new Error('Artefact not found.');
        }
        return await artefactRepository.updateArtefact(artefactId, artefactData);
    },

    async saveTransformations(artefactId, transformations) {
        const { position, rotation, scale } = transformations;
        await artefactRepository.saveTransformations(artefactId, { position, rotation, scale });
    },
};

module.exports = artefactService;