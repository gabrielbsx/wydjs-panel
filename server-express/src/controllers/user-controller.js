const Joi = require('joi');
const userSchema =  require('../schemas/users-schema');

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
                await userSchema.validateAsync(user, { abortEarly: false, });
                req.flash('notify', {
                    type: 'success',
                    message: 'Cadastro efetuado com sucesso!',
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
        return res.status(500).render('dashboard/pages/internalError', { err: err, });
    }
}

exports.read = async (req, res, next) => {
    try {
        if (!req.session.user) {
            try {
                const { username, password } = req.body;
                const validate = await userSchema
                    .tailor('login')
                    .validateAsync({
                        username: username,
                        password: password,
                    });
                    req.flash('notify', {
                        type: 'success',
                        message: 'Login efetuado com sucesso!',
                    });
            } catch (err) {
                req.flash('notify', {
                    type: 'danger',
                    message: err.details,
                })
            }
            return res.redirect('/');
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