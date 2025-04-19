const express = require('express');
const reportController = require('../controllers/reportController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Define report routes
router.get('/pending', authenticateUser, authorizeRoles('Admin'), reportController.getAllPendingReports);
router.post('/artefact/:artefactId', authenticateUser, authorizeRoles('Visitor', 'Exhibitor', 'Admin'), reportController.addReport);
router.patch('/:reportId/resolve', authenticateUser, authorizeRoles('Admin'), reportController.markReportAsResolved);
router.delete('/:reportId', authenticateUser, authorizeRoles('Admin'), reportController.deleteReport);

module.exports = router;