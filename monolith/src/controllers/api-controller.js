require('dotenv').config();
const Joi = require('joi');
const userSchema =  require('../schemas/users-schema');
const guildmarkSchema = require('../schemas/guildmark-schema');
const donatepackageSchema = require('../schemas/donatepackage-schema');
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
                        return res.status(200).json({
                            status: 'success',
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
                        return res.status(301).json({
                            status: 'error',
                            message: 'Não foi possível cadastrar!',
                        });
                    }
                } else {
                    return res.status(301).json({
                        status: 'error',
                        message: 'Não foi possível cadastrar a conta!',
                    });
                }
            } else {
                return res.status(301).json({
                    status: 'error',
                    message: 'Conta existente!',
                });
            }
        } catch (err) {
            return res.status(301).json({
                status: 'error',
                message: err.details || 'Erro interno!',
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Erro interno!',
        });
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
            return res.status(200).json({
                status: 'success',
                message: 'Um e-mail foi enviado para você, confirma para recuperaar sua conta!',
            });
        } catch (err) {
            return res.status(301).json({
                status: 'error',
                message: err.details || 'Erro interno!',
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Erro interno!',
        });
    }
};

exports.guildmark = async (req, res, next) => {
    try {
        try {
            const { guildid } = req.body;
            const { guildmark } = req.files;
            var status = 'error';

            var message;

            await guildmarkSchema.validateAsync({ guildid: guildid }, { abortEarly: false, });
            
            if (typeof guildmark !== 'undefined') {
                if (guildmark.mimetype === 'image/bmp') {
                    if (guildmark.encoding === '7bit') {
                        if (guildmark.size <= 100000) {
                            let path = __dirname + '/../' + process.env.GUILD_PATH + 'b0' + (100000 + parseInt(guildid)) + '.bmp';
                            await guildmark.mv(path);
                            return res.status(200).json({
                                status: 'success',
                                message: 'Guildmark enviada com sucesso!',
                            });
                        } else {
                            return res.status(301).json({
                                status: 'error',
                                message: 'Guildmark muito grande!',
                            });
                        }
                    } else {
                        return res.status(301).json({
                            status: 'error',
                            message: 'Guildmark não é 24 bits!',
                        });
                    }
                } else {
                    return res.status(301).json({
                        status: 'error',
                        message: 'Guildmark inválido!',
                    });
                }
            } else {
                return res.status(301).json({
                    status: 'error',
                    message: 'Envie uma guildmark!',
                });
            }
        } catch (err) {
            return res.status(301).json({
                status: 'error',
                message: err.details || 'Envie uma guildmark!',
            });

        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Erro interno',
        });
    }
};

exports.changepassword = async (req, res, next) => {
    try {
        try {
            const { oldpassword, password_confirm } = req.body;
            var { password } = req.body;
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
                        if (result) {
                            return res.status(200).json({
                                status: 'success',
                                message: 'Senha alterada com sucesso!',
                            });
                        } else {
                            await Game.changePassword(username, oldpassword);
                            return res.status(301).json({
                                status: 'error',
                                message: 'Não foi possível alterar a senha!',
                            });
                        }
                    } else {
                        return res.status(301).json({
                            status: 'error',
                            message: 'Não foi possível alterar a senha!',
                        });
                    }
                } else {
                    return res.status(301).json({
                        status: 'error',
                        message: 'Senha antiga inválida!',
                    });
                }
            } else {
                return res.status(301).json({
                    status: 'error',
                    message: 'Conta inexistente!',
                });
            }
        } catch (err) {
            return res.status(301).json({
                status: 'error',
                message: err.details || 'Não foi possível alterar a senha!',
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Erro interno!',
        });
    }
};

exports.recoverynumericpassword = async (req, res, next) => {
    try {
        try {

        } catch (err) {
            return res.status(301).json({
                status: 'error',
                message: err.details || 'Erro interno!',
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Erro interno!',
        });
    }
};

/**
 * ADMIN
 */

exports.createdonatepackage = async (req, res, next) => {
    try {
        try {
            const { name, value, donate, percent } = req.body;

            await donatepackageSchema
                .validateAsync({
                    name: name,
                    value: value,
                    donate: donate,
                    percent: percent,
                }, { abortEarly: false, });

            

        } catch (err) {
            return res.status(301).json({
                status: 'error',
                message: err.details || 'Erro interno!',
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Erro interno!',
        });
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