require('dotenv').config();
const Joi = require('joi');
const userSchema =  require('../schemas/users-schema');
const guildmarkSchema = require('../schemas/guildmark-schema');
const userModel = require('../models/users-model');
const Game = new (require('../helpers/game'))();
const bcrypt = require("bcryptjs");
const { v4 } = require('uuid');

exports.register = async (req, res, next) => {
    try {
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
            if (await Game.userExists(username) === false) {
                delete user.password_confirm;
                user.id = v4();
                user.access = 0;
                user.status = 0;
                user.created_at = new Date();
                user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(15));
                if (await userModel.create(user)) {
                    if (await Game.createAccount(username, password)) {
                        req.flash('success', {
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
                        req.flash('error', {
                            message: 'Não foi possível cadastrar a conta!',
                        });
                    }
                }
            } else {
                req.flash('error', {
                    message: 'Conta existente!',
                });
            }
        } catch (err) {
            req.flash('error', {
                message: err.details,
            });
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500', { err: err, });
    }
}

exports.login = async (req, res, next) => {
    try {
        try {
            const { username, password } = req.body;
            await userSchema
                .tailor('login')
                .validateAsync({
                    username: username,
                    password: password,
                });
            const user = await Game.userExists(username);
            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    delete user.password;
                    req.flash('success', {
                        message: 'Login efetuado com sucesso!',
                    });
                    req.session.user = user;
                } else {
                    req.flash('error', {
                        message: 'Não foi possível efetuar o login!',
                    });
                }
            }
        } catch (err) {
            req.flash('error', {
                message: err.details,
            });
            return res.redirect('/');
        }
        return res.redirect('/home');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
}

exports.recovery = async (req, res, next) => {
    try {
        try {
            const { email } = req.body;
            await userSchema
                .tailor('recovery')
                .validateAsync({
                    email: email,
                });
            req.flash('success', {
                message: 'Um e-mail foi enviado para você, confira para recuperar sua conta!',
            });
        } catch (err) {
            req.flash('error', {
                message: err.details,
            });
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.guildmark = async (req, res, next) => {
    try {
        try {
            const { guildid } = req.body;
            const { guildmark } = req.files;

            let message;

            await guildmarkSchema.validateAsync({ guildid: guildid }, { abortEarly: false, });
    
            if (guildmark.mimetype === 'image/bmp') {
                if (guildmark.encoding === '7bit') {
                    if (guildmark.size <= 100000) {
                        let path = __dirname + '/../' + process.env.GUILD_PATH + 'b0' + (100000 + parseInt(guildid)) + '.bmp';
                        await guildmark.mv(path);
                        type = 'success';
                        message = 'Guildmark enviada com sucesso!';
                    } else message = 'Guildmark muito grande!';
                } else message = 'Guildmark não é 24 bits!';
            } else message = 'Guildmark inválido!';

            req.flash(type, {
                message: message,
            });
            
        } catch (err) {
            req.flash('error', {
                message: err.details,
            });
        }

        return res.redirect('/guildmark');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.changepassword = async (req, res, next) => {
    try {
        try {
            var { oldpassword, password, password_confirm } = req.body;
            const { username } = req.session.user;

            await userSchema
                .tailor('changepassword')
                .validateAsync({
                    username: username,
                    password: password,
                    password_confirm: password_confirm,
                });
    
            const user = await Game.userExists(username);
    
            if (user) {

                if (await bcrypt.compare(oldpassword, user.password)) {

                    if (await Game.changePassword(username, password)) {

                        password = await bcrypt.hash(password, await bcrypt.genSalt(15));

                        const result = await userModel.update({ password: password, }, {
                            where: {
                                username: username,
                            }
                        });

                        console.log(result);

                        if (result) {
                            req.flash('success', {
                                message: 'Senha alterada com sucesso!',
                            });
                        } else {
                            await Game.changePassword(username, oldpassword);
                            req.flash('error', {
                                message: 'Não foi possível alterar a senha!',
                            });
                        }

                    } else {
                        req.flash('error', {
                            message: 'Não foi possível alterar a senha!',
                        });
                    }

                } else {
                    req.flash('error', {
                        message: 'Senha antiga inválida!',
                    });
                }

            } else {
                req.flash('error', {
                    message: 'Conta inexistente!',
                });
            }

        } catch (err) {
            req.flash('error', {
                message: err.details,
            });
        }

        return res.redirect('/change-password');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

/**
 * ADMIN
 */

exports.createdonatepackage = async (req, res, next) => {
    try {
        try {
            const { name, value, donate, percent } = req.body;
        } catch (err) {
            req.flash('error', {
                message: err.details,
            });
        }
        return res.redirect('/donate-package');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.createdonateitem = async (req, res, next) => {
    try {
        try {
            const { name_package, itemname, itemcode } = req.body;
        } catch (err) {
            req.flash('error', {
                message: err.details,
            });
        }
        return res.redirect('donate-item');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};