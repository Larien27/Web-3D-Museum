const Joi = require('joi');

const exhibitionModel = {
    validateExhibition(data) {
        const schema = Joi.object({
            title: Joi.string().min(3).max(255).required(),
            description: Joi.string().min(10).required(),
        });

        return schema.validate(data);
    }
};

module.exports = exhibitionModel;