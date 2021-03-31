const Joi = require('joi');

module.exports = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(12)
        .required(),
    
    password: Joi.string()
        .alphanum()
        .min(4)
        .max(12)
        .required(),

    password_confirm: Joi.ref('password'),

    access: Joi.number()
        .integer()
        .min(0)
        .max(3),
    
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        }),
});