const db = require('../../db');
const { bucket } = require('../../cloudStorage');

const artefactRepository = {
    // Save new artefact into the database
    async addArtefact(exhibitionId, artefactData) {
        const { title, description, file } = artefactData;

        const fileName = `artefacts/${exhibitionId}_${file.originalname}_${Date.now()}`;
        const fileUpload = bucket.file(fileName);

        try {
            console.log('Uploading files to Firebase');
            
            await new Promise((resolve, reject) => {
                const stream = fileUpload.createWriteStream({ metadata: { contentType: file.mimetype } });
                
                stream.on('error', (err) => {
                    console.error('Firebase upload error: ', err);
                    reject(err);
                });
                stream.on('finish', resolve);
                stream.end(file.buffer);
            });

            console.log('Firebase upload finished');

            console.log('Generating Firebase file URL');
            const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
            console.log('Firebase file URL: ', fileUrl);
            
            const result = await db.query('INSERT INTO artefacts (exhibition_id, title, description, file_path) VALUES ($1, $2, $3, $4) RETURNING id', [exhibitionId, title, description, fileUrl]);
            return { id: result.rows[0].id, fileUrl };
        } catch (error) {
            throw new Error('File upload failed.');
        }
    },

    async findArtefactsByExhibition(exhibitionId) {
        const result = await db.query('SELECT * FROM artefacts WHERE exhibition_id = $1', [exhibitionId]);
        return result.rows;
    },

    async findArtefactById(artefactId) {
        const result = await db.query('SELECT * FROM artefacts WHERE id = $1', [artefactId]);
        return result.rows[0];
    },

    async addFavorite(userId, artefactId) {
        await db.query('INSERT INTO favorites (user_id, artefact_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [userId, artefactId]);
    },

    async removeFavorite(userId, artefactId) {
        await db.query('DELETE FROM favorites WHERE user_id = $1 AND artefact_id = $2', [userId, artefactId]);
    },

    async findFavorite(userId, artefactId) {
        const result = await db.query('SELECT 1 FROM favorites WHERE user_id = $1 AND artefact_id = $2', [userId, artefactId]);
        return result.rowCount > 0;
    },

    async addReport(userId, artefactId, reason) {
        await db.query('INSERT INTO reports (artefact_id, user_id, reason) VALUES ($1, $2, $3)', [artefactId, userId, reason]);
    },

    async getAllReports() {
        const result = await db.query('SELECT reports.id, reports.reason, reports.artefact_id, reports.user_id, users.username, artefacts.title FROM reports JOIN users ON reports.user_id = users.id JOIN artefacts ON reports.artefact_id = artefacts.id ORDER BY reports.id DESC');
        return result.rows;
    },
};

module.exports = artefactRepository;