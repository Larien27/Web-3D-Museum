const Joi = require('joi');

// User validation schema
const userModel = {
    validateUserRegistration(data) {
        const schema = Joi.object({
            username: Joi.string().min(3).max(100).required(),
            email: Joi.string().email().max(255).required(),
            password: Joi.string().min(6).max(255).required(),
        });

        return schema.validate(data);
    },

    validateUserLogin(data) {
        const schema = Joi.object({
            email: Joi.string().email().max(255).required(),
            password: Joi.string().min(6).max(255).required(),
        });

        return schema.validate(data);
    },

    validateChangeUsername(data) {
        const schema = Joi.object({
            currentUsername: Joi.string().min(3).max(100).required(),
            newUsername: Joi.string().min(3).max(100).required(),
            password: Joi.string().min(6).max(255).required(),
        });

        return schema.validate(data);
    },

    validateChangeEmail(data) {
        const schema = Joi.object({
            currentEmail: Joi.string().email().max(255).required(),
            newEmail: Joi.string().email().max(255).required(),
            password: Joi.string().min(6).max(255).required(),
        });

        return schema.validate(data);
    },

    validateChangePassword(data) {
        const schema = Joi.object({
            username: Joi.string().min(3).max(100).required(),
            currentPassword: Joi.string().min(6).max(255).required(),
            newPassword: Joi.string().min(6).max(255).required(),
        });

        return schema.validate(data);
    },
};

module.exports = userModel;