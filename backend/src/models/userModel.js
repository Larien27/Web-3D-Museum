const Joi = require('joi');

// User validation schema
const userModel = {
    validateUserRegistration(data) {
        const schema = Joi.object({
            username: Joi.string().min(3).max(70).required(),
            email: Joi.string().email().max(100).required(),
            password: Joi.string().min(6).max(255).required()
        });

        return schema.validate(data);
    },

    validateUserLogin(data) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        return schema.validate(data);
    }
};

module.exports = userModel;