const reportService = require('../services/reportService');

const reportController = {
    async addReport(req, res) {
        try {
            const { artefactId } = req.params;
            const userId = req.user.id;
            const { reason } = req.body;

            if (!reason) {
                return res.status(400).json({ message: 'Report reason is required.' });
            }

            await reportService.addReport(userId, artefactId, reason);
            res.status(201).json({ message: 'Artefact report was submitted.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllPendingReports(req, res) {
        try {
            const reports = await reportService.getAllPendingReports();
            res.status(200).json(reports);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async markReportAsResolved(req, res) {
        try {
            const { reportId } = req.params;
            const updatedReport = await reportService.markReportAsResolved(reportId);
            res.status(200).json({ message: 'Report marked as resolved', report: updatedReport });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    async deleteReport(req, res) {
        try {
            const { reportId } = req.params;
            await reportService.deleteReport(reportId);
            res.status(200).json({ message: 'Report deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
}

module.exports = reportController;