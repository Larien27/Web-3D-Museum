const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Define favorite routes
router.post('/artefact/:artefactId', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), favoriteController.addFavorite);
router.get('/artefact/:artefactId', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), favoriteController.isFavorite);
router.delete('/artefact/:artefactId', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), favoriteController.removeFavorite);

module.exports = router;