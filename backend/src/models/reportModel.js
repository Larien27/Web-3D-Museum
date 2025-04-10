const Joi = require('joi');

const reportModel = {
    validateReport(data) {
        const schema = Joi.object({
            reason: Joi.string().min(5).required(),
        });

        return schema.validate(data);
    }
};

module.exports = reportModel;