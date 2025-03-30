const reportRepository = require('../repositories/reportRepository');

const reportService = {
    async addReport(userId, artefactId, reason) {
        return await reportRepository.addReport(userId, artefactId, reason);
    },

    async getAllPendingReports() {
        return await reportRepository.getAllPendingReports();
    },

    async markReportAsResolved(reportId) {
        const report = await reportRepository.markReportAsResolved(reportId);
        if (!report) {
            throw new Error('Report not found.');
        }
        return report;
    },

    async deleteReport(reportId) {
        const report = await reportRepository.deleteReport(reportId);
        if (!report) {
            throw new Error('Report not found.');
        }
        return report;
    },
};

module.exports = reportService;