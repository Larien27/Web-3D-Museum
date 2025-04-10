const db = require('../../db');

// Repository for handling report-related database operations
const reportRepository = {
    /**
     * Adds a new report to the database.
     * @param {number} userId - ID of the user submitting the report.
     * @param {number} artefactId - ID of the artefact being reported.
     * @param {string} reason - Reason for the report.
     */
    async addReport(userId, artefactId, reason) {
        await db.query('INSERT INTO reports (artefact_id, user_id, reason) VALUES ($1, $2, $3)', [artefactId, userId, reason]);
    },

    /**
     * Retrieves all reports that are not marked as resolved.
     * Includes related user and artefact information.
     * @returns {Array} List of pending reports.
     */
    async getAllPendingReports() {
        const result = await db.query("SELECT reports.id, reports.reason, reports.artefact_id, reports.user_id, users.username, artefacts.title FROM reports JOIN users ON reports.user_id = users.id JOIN artefacts ON reports.artefact_id = artefacts.id WHERE reports.status IS NULL OR reports.status != 'resolved' ORDER BY reports.id DESC");
        return result.rows;
    },

    /**
     * Marks a specific report as resolved.
     * @param {number} reportId - ID of the report to resolve.
     * @returns {Object} The updated report.
     */
    async markReportAsResolved(reportId) {
        const result = await db.query("UPDATE reports SET status = 'resolved' WHERE id = $1 RETURNING *", [reportId]);
        return result.rows[0];
    },

    /**
     * Deletes a report by its ID.
     * @param {number} reportId - ID of the report to delete.
     * @returns {Object} The deleted report.
     */
    async deleteReport(reportId) {
        const result = await db.query('DELETE FROM reports WHERE id = $1 RETURNING *', [reportId]);
        return result.rows[0];
    },
};

module.exports = reportRepository;