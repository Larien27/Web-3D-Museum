const db = require('../../db');

const exhibitionRepository = {
    async createExhibition(exhibitionData) {
        const { title, description } = exhibitionData;
        const result = await db.query('INSERT INTO exhibitions (title, description) VALUES ($1, $2) RETURNING id', [title, description]);
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
};

module.exports = exhibitionRepository;