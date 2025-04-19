const express = require('express');
const exhibitionController = require('../controllers/exhibitionController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Define exhibition routes
router.post('/create', authenticateUser, authorizeRoles('Exhibitor', 'Admin'), exhibitionController.createExhibition);
router.get('/', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), exhibitionController.getAllExhibitions);
router.get('/:exhibitionId', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), exhibitionController.getExhibitionById);
router.put('/:exhibitionId/edit', authenticateUser, authorizeRoles('Exhibitor', 'Admin'), exhibitionController.updateExhibition);
router.delete('/:exhibitionId', authenticateUser, authorizeRoles('Exhibitor', 'Admin'), exhibitionController.deleteExhibition)

module.exports = router;