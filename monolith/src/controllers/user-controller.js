const Joi = require('joi');
const userModel = require('../models/users-model');
const userSchema =  require('../schemas/users-schema');
const game = new (require('../helpers/game'))();
const bcrypt = require("bcryptjs");
const { v4 } = require('uuid');

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
                if (await game.userExists(username) === false) {
                    delete user.password_confirm;
                    user.id = v4();
                    user.access = 0;
                    user.status = 0;
                    user.created_at = new Date();
                    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(15));
                    if (await userModel.create(user)) {
                        if (await game.createAccount(username, password)) {
                            req.flash('notify', {
                                type: 'success',
                                message: 'Cadastro efetuado com sucesso!',
                            });
                        } else {
                            await userModel.destroy({
                                where: {
                                    id: user.id,
                                    name: name,
                                    username: username,
                                    email: email,
                                },
                            });
                            req.flash('notify', {
                                type: 'danger',
                                message: 'Não foi possível cadastrar a conta!',
                            });
                        }
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
                const user = await game.userExists(username);
                if (user) {
                    if (await bcrypt.compare(password, user.password)) {
                        delete user.password;
                        req.flash('notify', {
                            type: 'success',
                            message: 'Login efetuado com sucesso!',
                        });
                        req.session.user = user;
                    } else {
                        req.flash('notify', {
                            type: 'danger',
                            message: 'Não foi possível efetuar o login!',
                        });
                    }
                }
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