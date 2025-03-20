const express = require('express');
const artefactController = require('../controllers/artefactController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Define artefact routes
router.get('/reports', artefactController.getAllReports);
router.post('/:exhibitionId/upload', artefactController.uploadArtefact);
router.get('/exhibition/:exhibitionId', artefactController.getArtefactsbyExhibition);
router.get('/:artefactId', artefactController.getArtefactById);
router.post('/:artefactId/favorite', authenticateUser, artefactController.addFavorite);
router.get('/:artefactId/favorite', authenticateUser, artefactController.isFavorite);
router.delete('/:artefactId/favorite', authenticateUser, artefactController.removeFavorite);
router.post('/:artefactId/report', authenticateUser, artefactController.addReport);

module.exports = router;