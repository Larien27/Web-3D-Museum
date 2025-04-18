const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Define user routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/change-username', userController.changeUsername);
router.post('/change-email', userController.changeEmail);
router.post('/change-password', userController.changePassword);
router.get('/', userController.getAllUsers);
router.delete('/:userId', userController.deleteUser);
router.put('/update-role', userController.changeUserRole);
router.put('/reset-password', userController.resetPassword);

module.exports = router;