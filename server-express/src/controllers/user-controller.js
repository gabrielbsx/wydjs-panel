const Joi = require('joi');
const { max } = require('../models/users-model');

const loginSchema = Joi.object({
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

    password_confirm: Joi.valid(Joi.ref('password'))
        .required()
        .messages({
            'string.required': 'Confirmação de senha obrigatória!',
            'string.only': 'As senhas não são idênticas!',
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, })
        .required()
        .messages({
            'string.empty': 'E-mail não deve estar vázia!',
            'string.required': 'E-mail obrigatório!',
        }),
        
});

exports.login = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(200).render('dashboard/pages/login');
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
};

exports.register = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(200).render('dashboard/pages/register');
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
}

exports.recovery = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(200).render('dashboard/pages/recovery');
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
}

exports.create = async (req, res, next) => {
    try {
        if (!req.session.user) {
            try {
                const { name, username, password, password_confirm, email } = req.body;
                user = {
                    name: name,
                    username: username,
                    password: password,
                    password_confirm: password_confirm,
                    email: email,
                };
                const validate = await loginSchema.validateAsync(user);
                req.flash('notify', {
                    type: 'success',
                    message: user,
                });
            } catch (err) {
                req.flash('notify', {
                    type: 'danger',
                    message: err.details,
                });
            }
        }
        return res.redirect('/register');
    } catch (err) {
        console.log(err);
        return res.status(500).render('dashboard/pages/internalError', { err: err, });
    }
}

exports.read = async (req, res, next) => {
    try {
        if (!req.session.user) {
            const { username, password } = req.body;
            if (true) {
                return res.redirect('/');
            }
        }
        return res.redirect('/login');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
}

exports.get = async (req, res, next) => {
    try {
        if (!req.session.user) {
            if (true) {
                return res.redirect('/login');
            }
        }
        return res.redirect('/recovery');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
};