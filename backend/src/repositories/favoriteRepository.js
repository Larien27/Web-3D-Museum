const db = require('../../db');

// Repository for handling user's favorite artefacts
const favoriteRepository = {
    /**
     * Adds an artefact to the user's favorites.
     * If the favorite already exists, it does nothing.
     * @param {number} userId - ID of the user.
     * @param {number} artefactId - ID of the artefact to favorite.
     */
    async addFavorite(userId, artefactId) {
        await db.query('INSERT INTO favorites (user_id, artefact_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [userId, artefactId]);
    },

    /**
     * Removes an artefact from the user's favorites.
     * @param {number} userId - ID of the user.
     * @param {number} artefactId - ID of the artefact to remove.
     */
    async removeFavorite(userId, artefactId) {
        await db.query('DELETE FROM favorites WHERE user_id = $1 AND artefact_id = $2', [userId, artefactId]);
    },

    /**
     * Checks if the specific favorite exists for the user.
     * @param {number} userId - ID of the user.
     * @param {number} artefactId - ID of the artefact.
     * @returns {boolean} True if favorite exists, otherwise false.
     */
    async findFavorite(userId, artefactId) {
        const result = await db.query('SELECT 1 FROM favorites WHERE user_id = $1 AND artefact_id = $2', [userId, artefactId]);
        return result.rowCount > 0;
    },
};

module.exports = favoriteRepository;