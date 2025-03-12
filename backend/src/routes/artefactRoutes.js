const express = require('express');
const artefactController = require('../controllers/artefactController');
const router = express.Router();

// Define artefact routes
router.post('/:exhibitionId/upload', artefactController.uploadArtefact);
router.get('/:exhibitionId', artefactController.getArtefactsbyExhibition);

module.exports = router;