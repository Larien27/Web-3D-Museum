const db = require('../../db');

const favoriteRepository = {
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
};

module.exports = favoriteRepository;