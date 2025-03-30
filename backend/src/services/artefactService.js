const artefactRepository = require('../repositories/artefactRepository');

const artefactService = {
    async uploadArtefact(exhibitionId, artefactData) {
        if (!artefactData.title || !artefactData.file) {
            throw new Error('Artefact title and file are required.');
        }
        return await artefactRepository.addArtefact(exhibitionId, artefactData);
    },

    async getArtefactsbyExhibition(exhibitionId) {
        return await artefactRepository.findArtefactsByExhibition(exhibitionId);
    },

    async getArtefactById(artefactId) {
        const artefact = await artefactRepository.findArtefactById(artefactId);
        if (!artefact) {
            throw new Error('Artefact not found.');
        }
        return artefact;
    },

    async addReport(userId, artefactId, reason) {
        return await artefactRepository.addReport(userId, artefactId, reason);
    },

    async getAllPendingReports() {
        return await artefactRepository.getAllPendingReports();
    },

    async get3DModelsByExhibition(exhibitionId) {
        const artefacts = await artefactRepository.findArtefactsByExhibition(exhibitionId);

        return artefacts.filter(artefact => artefact.file_path).map(artefact => ({
            id: artefact.id,
            title: artefact.title,
            modelFileUrl: artefact.file_path
        }));
    },

    async markReportAsResolved(reportId) {
        const report = await artefactRepository.markReportAsResolved(reportId);
        if (!report) {
            throw new Error('Report not found.');
        }
        return report;
    },

    async deleteReport(reportId) {
        const report = await artefactRepository.deleteReport(reportId);
        if (!report) {
            throw new Error('Report not found.');
        }
        return report;
    },
};

module.exports = artefactService;