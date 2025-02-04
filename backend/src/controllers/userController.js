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
            console.error(error);
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
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = userController;