require('dotenv').config();
const Joi = require('joi');
const userSchema =  require('../schemas/users-schema');
const guildmarkSchema = require('../schemas/guildmark-schema');
const donatepackageSchema = require('../schemas/donatepackage-schema');
const donateitemsSchema = require('../schemas/donateitems-schema');
const userModel = require('../models/users-model');
const donatepackagesModel = require('../models/donatepackages-model');
const donateitemsModel = require('../models/donateitems-model');
const Game = new (require('../helpers/game'))();
const bcrypt = require("bcryptjs");
const { v4 } = require('uuid');

exports.register = async (req, res, next) => {
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
                        message: 'Não foi possível cadastrar!',
                    });
                }
            } else {
                req.flash('error', {
                    message: 'Não foi possível cadastrar a conta!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Conta existente!',
            });
        }
        return res.redirect('/');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/');
    }
}

exports.login = async (req, res, next) => {
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
                return res.redirect('/home');
            } else {
                req.flash('error', {
                    message: 'Não foi possível efetuar o login!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Não foi possível efetuar o login!',
            });
        }
        return res.redirect('/');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno',
        });
        return res.redirect('/');
    }
}

exports.recovery = async (req, res, next) => {
    try {
        const { email } = req.body;
        await userSchema
            .tailor('recovery')
            .validateAsync({
                email: email,
            });
        req.flash('success', {
            message: 'Um e-mail foi enviado para você, confirma para recuperar sua conta!',
        });
        return res.redirect('/');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/');
    }
};

exports.guildmark = async (req, res, next) => {
    try {
        const { guildid } = req.body;
        const { guildmark } = req.files;
        await guildmarkSchema.validateAsync({ guildid: guildid }, { abortEarly: false, });
        
        if (typeof guildmark !== 'undefined') {
            if (guildmark.mimetype === 'image/bmp') {
                if (guildmark.encoding === '7bit') {
                    if (guildmark.size <= 100000) {
                        let path = __dirname + '/../' + process.env.GUILD_PATH + 'b0' + (100000 + parseInt(guildid)) + '.bmp';
                        await guildmark.mv(path);
                        req.flash('success', {
                            message: 'Guildmark enviada com sucesso!',
                        });
                    } else {
                        req.flash('error', {
                            message: 'Guildmark muito grande!',
                        });
                    }
                } else {
                    req.flash('error', {
                        message: 'Guildmark não é 24 bits!',
                    });
                }
            } else {
                req.flash('error', {
                    message: 'Guildmark inválido!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Envie uma guildmark!',
            });
        }
        return res.redirect('/home');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/home');
    }
};

exports.changepassword = async (req, res, next) => {
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
        return res.redirect('/home');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/home');
    }
};

exports.recoverynumericpassword = async (req, res, next) => {
    try {

    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/home');
    }
};

exports.createdonatepackage = async (req, res, next) => {
    try {
        const { name, value, donate, percent } = req.body;
        var donatepackage = {
            name: name,
            value: value,
            donate: donate,
            percent: percent,
        };
        await donatepackageSchema.validateAsync(donatepackage, { abortEarly: false, });
        donatepackage.id = v4();
        if (await donatepackagesModel.create(donatepackage)) {
            req.flash('success', {
                message: 'Pacote de doação criado com sucesso!',
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível adicionar pacote de doação!',
            });
        }
        return res.redirect('/home');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/home');
    }
};

exports.createdonateitem = async (req, res, next) => {
    try {
        const { id_package, itemname, item_id, eff1, eff2, eff3, effv1, effv2, effv3 } = req.body;
        var donateitems = {
            id_package: id_package,
            itemname: itemname,
            item_id: item_id,
            eff1: eff1,
            eff2: eff2,
            eff3: eff3,
            effv1: effv1,
            effv2: effv2,
            effv3: effv3,
        };
        await donateitemsSchema.validateAsync(donateitems, { abortEarly: false, });
        if (await donatepackageModel.findOne({ where: { id: id_package } })) {
            donateitems.id = v4();
            if (await donateitemsModel.create(donateitems)) {
                req.flash('success', {
                    message: 'Bonificação criada com sucesso!',
                });
            } else {
                req.flash('error', {
                    message: 'Não foi possível criar a bonificação!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Pacote de doação inexistente!',
            });
        }
        return res.redirect('/home');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/home');
    }
};

exports.getdonatepackages = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (typeof id !== 'undefined') {
            const data = await donatepackagesModel.findOne({
                where: {
                    id: id,
                },
            });
            return res.render('dashboard/pages/home', {
                data: data,
            });
        }
        const data = await donatepackagesModel.findAll();
        return res.render('dashboard/pages/home', {
            data: data,
        });
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/home');
    }
};

exports.getdonateitems = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (typeof id !== 'undefined') {
            const data = await donateitemsModel.findOne({
                where: {
                    id: id,
                },
            });
            return res.render('dashboard/pages/home', {
                data: data,
            });
        }
        const data = await donateitemsModel.findAll();
        return res.render('dashboard/pages/home', {
            data: data,
        });
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/home');
    }
};

exports.updatedonatepackage = async (req, res, next) => {
    try {
        const { id, name, value, donate, percent } = req.body;
        var donatepackage = {
            name: name,
            value: value,
            donate: donate,
            percent: percent,
        };
        await donatepackageSchema.validateAsync(donatepackage, { abortEarly: false, });
        if (await donatepackagesModel.update(donatepackage, { where: { id: id }})) {
            req.flash('success', {
                message: 'Pacote de doação atualizado com sucesso!',
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível atualizar o pacote de doação!',
            });
        }
        return res.redirect('/home');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/home');
    }
};

exports.updatedonateitems = async (req, res, next) => {
    try {
        const { id, id_package, itemname, item_id, eff1, eff2, eff3, effv1, effv2, effv3 } = req.body;
        var donateitems = {
            id_package: id_package,
            itemname: itemname,
            item_id: item_id,
            eff1: eff1,
            eff2: eff2,
            eff3: eff3,
            effv1: effv1,
            effv2: effv2,
            effv3: effv3,
        };
        await donateitemsSchema.validateAsync(donateitems, { abortEarly: false, });
        if (await donatepackagesModel.findOne({ where: { id: id_package }})) {
            if (await donateitemsModel.update(donateitems, { where: { id: id }})) {
                req.flash('success', {
                    message: 'Bonificação atualizada com sucesso!',
                });
            } else {
                req.flash('error', {
                    message: 'Não foi possível atualizar a bonificação!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Pacote de doação inexistente!',
            });
        }
        return res.redirect('/home');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/home');
    } 
};