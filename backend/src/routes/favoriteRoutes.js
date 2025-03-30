const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Define favorite routes
router.post('/artefact/:artefactId', authenticateUser, favoriteController.addFavorite);
router.get('/artefact/:artefactId', authenticateUser, favoriteController.isFavorite);
router.delete('/artefact/:artefactId', authenticateUser, favoriteController.removeFavorite);

module.exports = router;