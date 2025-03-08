const db = require('../../db');

const userRepository = {
    // Check if the email is already registered
    async findByEmail(email) {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },

    async findByUsername(username) {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },

    async findById(userId) {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        return result.rows[0];
    },

    // Create a new user in the database
    async createUser(userData) {
        const { username, email, password } = userData;
        const result = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email', [username, email, password]);
        return result.rows[0];
    },

    async updateUsername(userId, newUsername) {
        const result = await db.query('UPDATE users SET username = $1 WHERE id = $2', [newUsername, userId]);
        return result.rows[0];
    },

    async updateEmail(userId, newEmail) {
        const result = await db.query('UPDATE users SET email = $1 WHERE id = $2', [newEmail, userId]);
        return result.rows[0];
    },

    async updatePassword(userId, hashedPassword) {
        await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);
    },

    async findAllUsers() {
        const result = await db.query('SELECT * FROM users ORDER BY username');
        return result.rows;
    },

    async deleteUser(userId) {
        await db.query('DELETE FROM users WHERE id = $1', [userId]);
    },

    async updateUserRole(userId, newRole) {
        await db.query('UPDATE users SET role = $1 WHERE id = $2', [newRole, userId]);
    },
};

module.exports = userRepository;