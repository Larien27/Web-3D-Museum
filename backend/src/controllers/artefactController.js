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

    async addFavorite(req, res) {
        try {
            const { artefactId } = req.params;
            const userId = req.user.id;
            await artefactService.addFavorite(userId, artefactId);
            res.status(200).json({ message: 'Artefact added to favorites.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async removeFavorite(req, res) {
        try {
            const { artefactId } = req.params;
            const userId = req.user.id;
            await artefactService.removeFavorite(userId, artefactId);
            res.status(200).json({ message: 'Artefact removed from favorites.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async isFavorite(req, res) {
        try {
            const { artefactId } = req.params;
            const userId = req.user.id;
            const favorite = await artefactService.isFavorite(userId, artefactId);
            res.status(200).json({ isFavorite: favorite });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}

module.exports = artefactController;