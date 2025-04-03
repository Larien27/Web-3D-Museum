const db = require('../../db');

const exhibitionRepository = {
    async createExhibition(exhibitionData, creatorId) {
        const { title, description } = exhibitionData;
        const result = await db.query('INSERT INTO exhibitions (title, description, creator_id) VALUES ($1, $2, $3) RETURNING id', [title, description, creatorId]);
        return result.rows[0];
    },

    async findAllExhibitions() {
        const result = await db.query('SELECT * FROM exhibitions ORDER BY id DESC');
        return result.rows;
    },

    async findExhibitionById(exhibitionId) {
        const result = await db.query('SELECT * FROM exhibitions WHERE id = $1', [exhibitionId]);
        return result.rows[0];
    },

    async updateExhibition(exhibitionId, updatedData) {
        const { title, description } = updatedData;
        const result = await db.query('UPDATE exhibitions SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, exhibitionId]);
        return result.rows[0];
    },

    async deleteExhibition(exhibitionId) {
        await db.query('DELETE FROM exhibitions WHERE id = $1', [exhibitionId]);
    }
};

module.exports = exhibitionRepository;