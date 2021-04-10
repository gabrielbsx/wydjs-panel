const Joi = require('joi');
const userSchema =  require('../schemas/users-schema');
const gameController = new require('./game-controller');

exports.login = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(200).render('dashboard/pages/login');
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};

exports.register = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(200).render('dashboard/pages/register');
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
}

exports.recovery = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(200).render('dashboard/pages/recovery');
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
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
                await userSchema.tailor('register').validateAsync(user, { abortEarly: false, });
                if (await gameController.userExists(username) === false) {
                    if (await gameController.createUser(username, password)) {
                        req.flash('notify', {
                            type: 'success',
                            message: 'Cadastro efetuado com sucesso!',
                        });
                    } else {
                        req.flash('notify', {
                            type: 'danger',
                            message: 'Não foi possível cadastrar a conta!',
                        });
                    }
                } else {
                    req.flash('notify', {
                        type: 'danger',
                        message: 'Conta existente!',
                    });
                }
            } catch (err) {
                req.flash('notify', {
                    type: 'danger',
                    message: err.details,
                });
            }
        }
        return res.redirect('/register');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500', { err: err, });
    }
}

exports.read = async (req, res, next) => {
    try {
        if (!req.session.user) {
            try {
                const { username, password } = req.body;
                await userSchema
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
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
}

exports.get = async (req, res, next) => {
    try {
        if (!req.session.user) {
            try {
                const { email } = req.body;
                await userSchema
                    .tailor('recovery')
                    .validateAsync({
                        email: email,
                    });
                req.flash('notify', {
                    type: 'success',
                    message: 'Um e-mail foi enviado para você, confira para recuperar sua conta!',
                });
            } catch (err) {
                req.flash('notify', {
                    type: 'danger',
                    message: err.details,
                });
            }
        }
        return res.redirect('/recovery');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};