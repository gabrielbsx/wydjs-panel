const Joi = require('joi');

const authSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(12)
        .required(),
});

const changeSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(12),

    oldpassword: Joi.string()
        .alphanum()
        .min(4)
        .max(12),
    
    password: Joi.string()
        .alphanum()
        .min(4)
        .max(12),

    password_confirm: Joi.ref('password'),

    access: Joi.number()
        .integer()
        .min(0)
        .max(3),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, }),
});

const registerSchema = Joi.object({
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

    status: Joi.number()
        .integer()
        .min(0)
        .max(3),

    access: Joi.number()
        .integer()
        .min(0)
        .max(3),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, }).required(),
});

module.exports = {
    authSchema, registerSchema, changeSchema
};