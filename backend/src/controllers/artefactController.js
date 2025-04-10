const artefactService = require('../services/artefactService');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() }).single('modelFile');

const artefactController = {
    // Upload new artefact
    uploadArtefact(req, res) {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'File upload failed.' });
            }

            const { exhibitionId } = req.params;
            const { title, description } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'No file was uploaded.' });
            }

            try {
                const artefact = await artefactService.uploadArtefact(exhibitionId, { title, description, file });
                res.status(201).json({ message: 'Artefact uploaded successfully.', artefactId: artefact.id, fileUrl: artefact.fileUrl });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },

    async getArtefactsbyExhibition(req, res) {
        try {
            const artefacts = await artefactService.getArtefactsbyExhibition(req.params.exhibitionId);
            res.status(200).json(artefacts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getArtefactById(req, res) {
        try {
            const artefact = await artefactService.getArtefactById(req.params.artefactId);
            res.status(200).json(artefact);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    async get3DModelsByExhibition(req, res) {
        try {
            const { exhibitionId } = req.params;
            const models = await artefactService.get3DModelsByExhibition(exhibitionId);
            res.status(200).json(models);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteArtefact(req, res) {
        try {
            const exhibitionId = await artefactService.deleteArtefact(req.params.artefactId);
            res.status(200).json({ message: 'Artefact deleted successfully.', exhibitionId });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateArtefact(req, res) {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'File upload failed.' });
            }

            const { artefactId } = req.params;
            const { title, description } = req.body;
            const file = req.file;

            try {
                const result = await artefactService.updateArtefact(artefactId, { title, description, file });
                res.status(200).json({ message: 'Artefact updated successfully.', fileUrl: result.fileUrl });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    },

    async saveTransformations(req, res) {
        const { artefactId } = req.params;
        const { position, rotation, scale } = req.body;

        try {
            await artefactService.saveTransformations(artefactId, { position, rotation, scale });
            res.status(200).json({ message: 'Transformations saved successfully.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = artefactController;