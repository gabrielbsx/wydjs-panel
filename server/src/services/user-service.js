const userRepository = require('../repositories/user-repository');
const isEmail = require('isemail');
const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');

module.exports = class userService{    
    constructor() {
        this.message = '';
    }

    async getMessage() {
        return this.message;
    }

    async isValidUsername(username) {
        try {
            if (username.match(/^([a-zA-Z0-9]{4,12})$/)) {
                return true;
            }
            this.message = 'Usuário deve conter 4 à 12 caracteres alfa numéricos!';
            return false;
        } catch (err) {
            return false;
        }
    }

    async isValidPassword(password) {
        try {
            if (password.match(/^([a-zA-Z0-9]{4,12})$/i)) {
                return true;
            }
            this.message = 'Senha deve conter 4 à 12 caracteres alfa numéricos!';
            return false;
        } catch (err) {
            return false;
        }
    }

    async isValidEmail(email) {
        try {
            if (isEmail.validate(email)) {
                return true;
            }
            this.message = 'E-mail inválido!';
            return false;
        } catch (err) {
            return false;
        }
    }

    async isValidStatus(status) {
        try {
            if (Number.isInteger(status) && status === 0 && status === 1) {
                return true;
            }
            this.message = 'Status inválido!';
            return false;
        } catch (err) {
            return false;
        }
    }

    async isValidAccess(access) {
        try {
            if (Number.isInteger(access) && access >= 0 && access <= 3) {
                return true;
            }
            this.message = 'Access inválido!';
            return false;
        } catch (err) {
            return false;
        }
    }

    async create(user) {
        try {
            if (await this.isValidUsername(user.username)) {
                if (await this.isValidPassword(user.password)) {
                    if (await this.isValidPassword(user.password)) {
                        if (await this.isValidPassword(user.confirm_password)) {
                            if (await this.isValidStatus(user.status) && await this.isValidAccess(user.access)) {
                                if (!(await this.getByUsername({ username: this.username }))) {
                                    delete user.confirm_password;
                                    user.id = v4();
                                    user.password = await this.getPasswordHash(user.password);
                                    const userData = await userRepository.create(user);
                                    if (userData) {
                                        this.message = 'Conta criada com sucesso!';
                                        return true;
                                    } else this.message = 'Não foi possível criar a conta!';
                                } else this.message = 'Conta existente!';
                            }
                        }
                    }
                }
            }
            return false;
        } catch (err) {
            this.message = 'Não foi possível efetuar a operação!';
            return false;
        }
    }

    async read(user) {
        try {
            const password = user.password;
            delete user.password;
            if (await this.isValidUsername(user.username)) {
                if (await this.isValidPassword(user.password)) {
                    const result = await this.getByUsername(user);
                    if (result) {
                        if (await bcrypt.compare(password, result.password)) {
                            this.message = 'Login efetuado com sucesso!';
                            delete result.password;
                            return result;
                        } else this.message = 'Não foi possível efetuar o login!';
                    } else this.message = 'Conta inexistente!';
                }
            }
            return false;
        } catch (err) {
            this.message = 'Não foi possível efetuar a operação!';
            return false;
        }
    }

    async update(user) {
        try {
            if (await this.isValidUsername(user.username)) {
                if (await this.isValidPassword(user.oldpassword)) {
                    const userData = await this.getByUsername({ username: user.username });
                    if (userData) {
                        if (await bcrypt.compare(user.oldpassword, userData.password)) {
                            const username = user.username;
                            delete user.username;
                            user.password = await this.getPasswordHash(user.password);
                            const userUpdate = await userRepository.update(user, { username: username, });
                            if (userUpdate) {
                                this.message = 'Conta atualizada com sucesso!';
                                return true;
                            } else this.message = 'Não foi possível atualizar a conta!';
                        } else this.message = 'Senha antiga inválida!';
                    } else this.message = 'Usuário inexistente!';
                }
            }
            return false;
        } catch (err) {
            this.message = 'Não foi possível efetuar a operação!';
            return false;
        }
    }

    async delete(user) {
        try {
            if (await this.isValidUsername(user.username)) {
                const userData = await userRepository.delete(user);
                if (userData) {
                    this.message = 'Conta deletada com sucesso';
                    return true;
                } else {
                    this.message = 'Não foi possível deletar a conta!';
                }
            }
            return false;
        } catch (err) {
            this.message = 'Não foi possível efetuar a operação!';
            return false;
        }
    }

    async getPasswordHash(password) {
        const salt = await bcrypt.genSalt(15);
        return await bcrypt.hash(password, salt);
    }
};