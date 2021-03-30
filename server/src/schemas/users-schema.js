const Joi = require('@hapi/joi');

module.exports = {
    name: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(4).max(12).required(),
    password: Joi.string().min(4).max(12).required(),
    email: Joi.string().email().required(),
    status: Joi.number().integer(),
    access: Joi.number().integer().required(),
};