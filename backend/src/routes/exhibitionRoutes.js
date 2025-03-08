const express = require('express');
const exhibitionController = require('../controllers/exhibitionController');
const router = express.Router();

// Define exhibition routes
router.post('/create', exhibitionController.createExhibition);
router.get('/', exhibitionController.getAllExhibitions);
router.get('/:exhibitionId', exhibitionController.getExhibitionById);

module.exports = router;