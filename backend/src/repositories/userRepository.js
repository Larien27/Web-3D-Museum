const db = require('../../db');

const userRepository = {
    // Check if the email is already registered
    async findByEmail(email) {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },

    // Create a new user in the database
    async createUser(userData) {
        const { username, email, password } = userData;
        const result = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email', [username, email, password]);
        return result.rows[0];
    }
};

module.exports = userRepository;