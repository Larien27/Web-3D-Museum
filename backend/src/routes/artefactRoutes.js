const express = require('express');
const artefactController = require('../controllers/artefactController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Define artefact routes
router.get('/:exhibitionId/artefacts/3d', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), artefactController.get3DModelsByExhibition);
router.post('/:exhibitionId/upload', authenticateUser, authorizeRoles('Exhibitor', 'Admin'), artefactController.uploadArtefact);
router.get('/exhibition/:exhibitionId', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), artefactController.getArtefactsbyExhibition);
router.get('/:artefactId', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), artefactController.getArtefactById);
router.delete('/:artefactId', authenticateUser, authorizeRoles('Exhibitor', 'Admin'), artefactController.deleteArtefact);
router.put('/:artefactId/save-transformations', authenticateUser, authorizeRoles('Exhibitor', 'Admin'), artefactController.saveTransformations);
router.put('/:artefactId', authenticateUser, authorizeRoles('Exhibitor', 'Admin'), artefactController.updateArtefact);

module.exports = router;