const express = require('express');
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Define user routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/change-username', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), userController.changeUsername);
router.post('/change-email', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), userController.changeEmail);
router.post('/change-password', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), userController.changePassword);
router.get('/', authenticateUser, authorizeRoles('Admin'), userController.getAllUsers);
router.delete('/:userId', authenticateUser, authorizeRoles('Admin'), userController.deleteUser);
router.put('/update-role', authenticateUser, authorizeRoles('Admin'), userController.changeUserRole);
router.put('/reset-password', authenticateUser, authorizeRoles('Admin'), userController.resetPassword);

module.exports = router;