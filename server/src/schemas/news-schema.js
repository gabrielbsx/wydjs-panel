const Joi = require('@hapi/joi');

module.exports = {
    title: Joi.string().error(() => 'Título deve ser apenas caracteres!')
        .min(5).error(() => 'Título deve ser apenas 5 caracteres!')
        .max(100).error(() => 'Título deve ser apenas 100 caracteres!')
        .required().error(() => 'Título é obrigatório!'),
    slug: Joi.string().error(() => 'Slug deve ser apenas caracteres!')
        .min(5).error(() => 'Slug deve conter até 5 caracteres!')
        .max(50).error(() => 'Slug deve conter até 50 caracteres!')
        .required().error(() => 'Slug é obrigatório!'),
    id_user: Joi.number().integer().required(),
};