const express = require('express');
const reportController = require('../controllers/reportController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Define report routes
router.get('/pending', reportController.getAllPendingReports);
router.post('/artefact/:artefactId', authenticateUser, reportController.addReport);
router.patch('/:reportId/resolve', reportController.markReportAsResolved);
router.delete('/:reportId', reportController.deleteReport);

module.exports = router;