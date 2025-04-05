const db = require('../../db');
const { bucket } = require('../../cloudStorage');

const artefactRepository = {
    // Save new artefact into the database
    async addArtefact(exhibitionId, artefactData) {
        const { title, description, file } = artefactData;

        const fileName = `artefacts/${Date.now()}_${exhibitionId}_${file.originalname}`;
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

    async deleteArtefact(artefact) {
        const fileUrl = artefact.file_path;
        const fileName = decodeURIComponent(fileUrl.split('/o/')[1].split('?')[0]);
        
        try {
            await bucket.file(fileName).delete();
            await db.query('DELETE FROM artefacts WHERE id = $1', [artefact.id]);
        } catch (error) {
            throw new Error('Failed to delete artefact.');
        }
    },
};

module.exports = artefactRepository;