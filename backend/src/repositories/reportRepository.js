const db = require('../../db');

const reportRepository = {
    async addReport(userId, artefactId, reason) {
        await db.query('INSERT INTO reports (artefact_id, user_id, reason) VALUES ($1, $2, $3)', [artefactId, userId, reason]);
    },

    async getAllPendingReports() {
        const result = await db.query("SELECT reports.id, reports.reason, reports.artefact_id, reports.user_id, users.username, artefacts.title FROM reports JOIN users ON reports.user_id = users.id JOIN artefacts ON reports.artefact_id = artefacts.id WHERE reports.status IS NULL OR reports.status != 'resolved' ORDER BY reports.id DESC");
        return result.rows;
    },

    async markReportAsResolved(reportId) {
        const result = await db.query("UPDATE reports SET status = 'resolved' WHERE id = $1 RETURNING *", [reportId]);
        return result.rows[0];
    },

    async deleteReport(reportId) {
        const result = await db.query('DELETE FROM reports WHERE id = $1 RETURNING *', [reportId]);
        return result.rows[0];
    },
};

module.exports = reportRepository;