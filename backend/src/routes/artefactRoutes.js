const express = require('express');
const artefactController = require('../controllers/artefactController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Define artefact routes
router.get('/reports', artefactController.getAllPendingReports);
router.patch('/reports/:reportId/resolve', artefactController.markReportAsResolved);
router.delete('/reports/:reportId', artefactController.deleteReport);
router.get('/:exhibitionId/artefacts/3d', artefactController.get3DModelsByExhibition);
router.post('/:exhibitionId/upload', artefactController.uploadArtefact);
router.get('/exhibition/:exhibitionId', artefactController.getArtefactsbyExhibition);
router.get('/:artefactId', artefactController.getArtefactById);
router.post('/:artefactId/report', authenticateUser, artefactController.addReport);

module.exports = router;