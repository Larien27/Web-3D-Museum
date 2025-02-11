const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Define user routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;