const userService = require('../services/userService');

const userController = {

    // Register a new user
    async registerUser(req, res) {
        const { username, email, password } = req.body;

        try {
            // Call the Service layer
            const result = await userService.registerUser({ username, email, password });
            
            // Send success response
            res.status(201).json({ message: 'User registered successfully.', user: result });

        } catch (error) {
            // Handle errors
            res.status(400).json({ message: error.message });
        }
    },

    // Log a user in
    async loginUser(req, res) {
        const { email, password } = req.body;

        try {
            // Call the Service layer
            const token = await userService.loginUser({ email, password });

            // Send success response
            res.status(200).json({ message: 'Login was successful.', token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async changeUsername(req, res) {
        const { currentUsername, newUsername, password } = req.body;
        try {
            await userService.changeUsername(currentUsername, newUsername, password);
            res.status(200).json({ message: 'Username changed successfully!' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async changeEmail(req, res) {
        const { currentEmail, newEmail, password } = req.body;
        try {
            await userService.changeEmail(currentEmail, newEmail, password);
            res.status(200).json({ message: 'Email changed successfully!' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async changePassword(req, res) {
        const { username, currentPassword, newPassword } = req.body;
        try {
            await userService.changePassword(username, currentPassword, newPassword);
            res.status(200).json({ message: 'Password changed successfully!' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}

module.exports = userController;