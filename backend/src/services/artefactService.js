const artefactRepository = require('../repositories/artefactRepository');
const artefactModel = require('../models/artefactModel');
const exhibitionRepository = require('../repositories/exhibitionRepository');
const { optimize3DModel } = require('../utils/modelOptimizer');

const artefactService = {
    async uploadArtefact(exhibitionId, artefactData, user) {
        const validation = artefactModel.validateArtefact(artefactData);
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }
        const fileValidation = artefactModel.validateFile(artefactData.file);
        if (fileValidation.error) {
            throw new Error(fileValidation.error.details[0].message);
        }

        const exhibition = await exhibitionRepository.findExhibitionById(exhibitionId);
        if (!exhibition) {
            throw new Error('Exhibition not found.');
        }
        
        if (
            user.role !== 'Admin' &&
            !(user.role === 'Exhibitor' && exhibition.creator_id === user.id)
        ) {
            throw new Error('You do not have permission to upload artefacts to this exhibition.');
        }
        
        const optimized = await optimize3DModel(artefactData.file.buffer, artefactData.file.originalname);
        artefactData.file.buffer = optimized.buffer;
        artefactData.file.originalname = optimized.optimizedName;

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

    async deleteArtefact(artefactId, user) {
        const artefact = await artefactRepository.findArtefactById(artefactId);
        if (!artefact) {
            throw new Error('Artefact not found.');
        }
        
        const exhibition = await exhibitionRepository.findExhibitionById(artefact.exhibition_id);
        if (!exhibition) {
            throw new Error('Exhibition not found.');
        }

        if (
            user.role !== 'Admin' &&
            !(user.role === 'Exhibitor' && exhibition.creator_id === user.id)
        ) {
            throw new Error('You do not have permission to delete this artefact.');
        }

        await artefactRepository.deleteArtefact(artefact);
        return artefact.exhibition_id;
    },

    async updateArtefact(artefactId, artefactData, user) {
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

        const exhibition = await exhibitionRepository.findExhibitionById(artefact.exhibition_id);
        if (!exhibition) {
            throw new Error('Exhibition not found.');
        }

        if (
            user.role !== 'Admin' &&
            !(user.role === 'Exhibitor' && exhibition.creator_id === user.id)
        ) {
            throw new Error('You do not have permission to edit this artefact.');
        }

        const optimized = await optimize3DModel(artefactData.file.buffer, artefactData.file.originalname);
        artefactData.file.buffer = optimized.buffer;
        artefactData.file.originalname = optimized.optimizedName;

        return await artefactRepository.updateArtefact(artefactId, artefactData);
    },

    async saveTransformations(artefactId, transformations, user) {
        const { position, rotation, scale } = transformations;

        const artefact = await artefactRepository.findArtefactById(artefactId);
        if (!artefact) {
            throw new Error('Artefact not found.');
        }

        const exhibition = await exhibitionRepository.findExhibitionById(artefact.exhibition_id);
        if (!exhibition) {
            throw new Error('Exhibition not found.');
        }

        if (
            user.role !== 'Admin' &&
            !(user.role === 'Exhibitor' && exhibition.creator_id === user.id)
        ) {
            throw new Error('You do not have permission to save the transformations of artefacts.');
        }

        await artefactRepository.saveTransformations(artefactId, { position, rotation, scale });
    },
};

module.exports = artefactService;