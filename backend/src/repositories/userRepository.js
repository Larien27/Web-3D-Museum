const db = require('../../db');

// Repository for handling user-related database operations
const userRepository = {
    /**
     * Finds a user by his email address.
     * @param {string} email - The user's email.
     * @returns {Object|null} The user object or null if not found.
     */
    async findByEmail(email) {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },

    /**
     * Finds a user by his username.
     * @param {string} username - The user's username.
     * @returns {Object|null} The user object or null if not found.
     */
    async findByUsername(username) {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },

    /**
     * Finds a user by his ID.
     * @param {number} userId - The user's ID.
     * @returns {Object|null} The user object or null if not found.
     */
    async findById(userId) {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        return result.rows[0];
    },

    /**
     * Creates a new user in the database.
     * @param {Object} userData - The new user's data (username, email, password).
     * @returns {Object} Basic user data (id, username, email).
     */
    async createUser(userData) {
        const { username, email, password } = userData;
        const result = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email', [username, email, password]);
        return result.rows[0];
    },

    /**
     * Updates a user's username.
     * @param {number} userId - The user's ID.
     * @param {string} newUsername - The new username.
     * @returns {Object} The updated user record.
     */
    async updateUsername(userId, newUsername) {
        const result = await db.query('UPDATE users SET username = $1 WHERE id = $2', [newUsername, userId]);
        return result.rows[0];
    },

    /**
     * Updates a user's email.
     * @param {number} userId - The user's ID.
     * @param {string} newEmail - The new email address.
     * @returns {Object} The updated user record.
     */
    async updateEmail(userId, newEmail) {
        const result = await db.query('UPDATE users SET email = $1 WHERE id = $2', [newEmail, userId]);
        return result.rows[0];
    },

    /**
     * Updates a user's password.
     * @param {number} userId - The user's ID.
     * @param {string} hashedPassword - The new hashed password.
     */
    async updatePassword(userId, hashedPassword) {
        await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);
    },

    /**
     * Retrieves all users, ordered by username.
     * @returns {Array} List of user objects.
     */
    async findAllUsers() {
        const result = await db.query('SELECT * FROM users ORDER BY username');
        return result.rows;
    },

    /**
     * Deletes a user from the database.
     * @param {number} userId - The user's ID.
     */
    async deleteUser(userId) {
        await db.query('DELETE FROM users WHERE id = $1', [userId]);
    },

    /**
     * Updates a user's role.
     * @param {number} userId - The user's ID.
     * @param {string} newRole -The new role to assign.
     */
    async updateUserRole(userId, newRole) {
        await db.query('UPDATE users SET role = $1 WHERE id = $2', [newRole, userId]);
    },
};

module.exports = userRepository;