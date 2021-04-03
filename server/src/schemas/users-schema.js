const Joi = require('joi');

module.exports = Joi.object({
    username: Joi.string().error(() => 'Usuário deve ser apenas caracteres!')
        .alphanum().error(() => 'Usuário deve ser apenas caracteres alphanumérico!')
        .min(4).error(() => 'Usuário deve ser conter no mínimo 4 caracteres!')
        .max(12).error(() => 'Usuário deve ser conter no máximo 12 caracteres!')
        .required().error(() => 'Usuário obrigatório!'),
    
    password: Joi.string().error(() => 'Senha deve ser apenas caracteres!')
        .alphanum().error(() => 'Senha deve ser apenas caracteres alphanumérico!')
        .min(4).error(() => 'Senha deve ser apenas no mínimo 4 caracteres!')
        .max(12).error(() => 'Senha deve ser apenas no máximo 12 caracteres!')
        .required().error(() => 'Senha obrigatório!'),

    password_confirm: Joi.ref('password'),

    access: Joi.number().error(() => 'Acesso deve ser apenas numérica!')
        .integer().error(() => 'Acesso deve ser apenas inteiros!')
        .min(0).error(() => 'Acesso inválido!')
        .max(3).error(() => 'Acesso inválido!'),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, }),
});