const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const userRepository = require('../repositories/userRepository');

const userService = {
    async registerUser(userData) {
    
        // Validate user input
        const validation = userModel.validateUserRegistration(userData);
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }

        const { username, email, password } = userData;

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists.');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user
        const newUser = await userRepository.createUser({
            username: username,
            email: email,
            password: hashedPassword,
        });

        return { id: newUser.id, username: newUser.username, email: newUser.email };
    },

    async loginUser(userData) {

        // Validate user input
        const validation = userModel.validateUserLogin(userData);
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }

        const { email, password } = userData;

        // Find the user
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password.');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid email or password.');

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;
    }
};

module.exports = userService;