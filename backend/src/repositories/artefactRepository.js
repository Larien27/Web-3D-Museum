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

    async deleteAllArtefactsByExhibition(exhibitionId) {
        const artefacts = await this.findArtefactsByExhibition(exhibitionId);
        for (const artefact of artefacts) {
            try {
                await this.deleteArtefact(artefact);
            } catch (err) {
                console.error(`Failed to delete artefact with ID ${artefact.id}:`, err.message);
            }
        }
    },

    async updateArtefact(artefactId, artefactData) {
        const { title, description, file } = artefactData;
        let fileUrl = null;

        if (file) {
            const existingArtefact = await this.findArtefactById(artefactId);

            // Delete old 3D model from Firebase
            if (existingArtefact?.file_path) {
                const oldFileName = decodeURIComponent(existingArtefact.file_path.split('/o/')[1].split('?')[0]);
                try {
                    await bucket.file(oldFileName).delete();
                    console.log('Old file deleted from Firebase:', oldFileName);
                } catch (err) {
                    console.warn('Warning: Failed to delete old file from Firebase', err.message);
                }
            }

            // Upload new 3D model to Firebase
            const fileName = `artefacts/${Date.now()}_${existingArtefact.exhibition_id}_${file.originalname}`;
            const fileUpload = bucket.file(fileName);

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
            fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
            console.log('Firebase file URL: ', fileUrl);
        }

        // Update database
        if (fileUrl) {
            await db.query('UPDATE artefacts SET title = $1, description = $2, file_path = $3 WHERE id = $4', [title, description, fileUrl, artefactId]);
        } else {
            await db.query('UPDATE artefacts SET title = $1, description = $2 WHERE id = $3', [title, description, artefactId]);
        }

        return { artefactId, fileUrl };
    },
};

module.exports = artefactRepository;