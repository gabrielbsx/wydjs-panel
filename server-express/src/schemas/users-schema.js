const Joi = require('joi');

exports.register = Joi.object().keys({
    name: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'Nome deve conter apenas caracteres alfa numéricos!',
            'string.empty': 'Nome não deve estar vázio!',
            'string.max': 'Nome muito grande!',
            'string.required': 'Nome obrigatório!',
        }),

    username: Joi.string()
        .alphanum()
        .min(4)
        .max(12)
        .required()
        .messages({
            'string.base': 'Usuário deve conter apenas caracteres alfa numéricos!',
            'string.empty': 'Usuário não deve estar vázia!',
            'string.alphanum': 'Usuário deve conter apenas caracteres alfa numéricos!',
            'string.min': 'Usuário deve conter no mínimo 4 caracteres!',
            'string.max': 'Usuário deve conter no máximo 12 caracteres!',
            'string.required': 'Usuário obrigatório!',
        }),

    password: Joi.string()
        .alphanum()
        .min(4)
        .max(12)
        .required()
        .messages({
            'string.base': 'Senha deve conter apenas caracteres alfa numéricos!',
            'string.empty': 'Senha não deve estar vázia!',
            'string.alphanum': 'Senha deve conter apenas caracteres alfa numéricos!',
            'string.min': 'Senha deve conter no mínimo 4 caracteres!',
            'string.max': 'Senha deve conter no máximo 12 caracteres!',
            'string.required': 'Senha obrigatória!',
        }),

    password_confirm: Joi.string().valid(Joi.ref('password'))
        .required()
        .messages({
            'string.required': 'Confirmação de senha obrigatória!',
            'any.only': 'As senhas não são idênticas!',
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, })
        .required()
        .messages({
            'string.empty': 'E-mail não deve estar vázia!',
            'string.required': 'E-mail obrigatório!',
            'string.email': 'E-mail inválido!',
        }),     
});