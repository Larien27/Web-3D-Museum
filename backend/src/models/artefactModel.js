const Joi = require('joi');

const artefactModel = {
    validateArtefact(data) {
        const schema = Joi.object({
            title: Joi.string().min(3).max(255).required(),
            description: Joi.string().min(10).required(),
            position: Joi.array().items(Joi.number()).length(3),
            rotation: Joi.array().items(Joi.number()).length(3),
            scale: Joi.array().items(Joi.number()).length(3),
        }).unknown(true);

        return schema.validate(data);
    },

    validateFile(file) {
        const schema = Joi.object({
            originalname: Joi.string().required(),
            mimetype: Joi.string().valid('application/octet-stream', 'model/gltf+json', 'application/zip').required(),
            size: Joi.number().max(5 * 1024 * 1024).required(),
        });

        return schema.validate({
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
        });
    }
};

module.exports = artefactModel;