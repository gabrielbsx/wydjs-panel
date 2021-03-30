const Joi = require('@hapi/joi');

module.exports = {
    title: Joi.string().min(5).max(100).required(),
    slug: Joi.string().min(5).max(50).required(),
    id_user: Joi.number().integer().required(),
};