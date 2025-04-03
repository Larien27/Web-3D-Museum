const express = require('express');
const exhibitionController = require('../controllers/exhibitionController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Define exhibition routes
router.post('/create', authenticateUser, exhibitionController.createExhibition);
router.get('/', exhibitionController.getAllExhibitions);
router.get('/:exhibitionId', exhibitionController.getExhibitionById);
router.put('/:exhibitionId/edit', exhibitionController.updateExhibition);
router.delete('/:exhibitionId', exhibitionController.deleteExhibition)

module.exports = router;