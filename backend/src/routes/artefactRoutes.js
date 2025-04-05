const express = require('express');
const artefactController = require('../controllers/artefactController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Define artefact routes
router.get('/:exhibitionId/artefacts/3d', artefactController.get3DModelsByExhibition);
router.post('/:exhibitionId/upload', artefactController.uploadArtefact);
router.get('/exhibition/:exhibitionId', artefactController.getArtefactsbyExhibition);
router.get('/:artefactId', artefactController.getArtefactById);
router.delete('/:artefactId', artefactController.deleteArtefact);
router.put('/:artefactId', artefactController.updateArtefact);

module.exports = router;