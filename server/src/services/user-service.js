const userRepository = require('../repositories/user-repository');
const userSchema = require('../schemas/users-schema');
const bcrypt = require('bcryptjs');

module.exports = class userService{
    constructor() {
        this.message = '';
    }

    create(account) {
        try {
            if (userSchema.validate(account)) {
                if (!this.getByUsername({ username: account.username })) {
                    if (userRepository.create(account)) {
                        this.message = 'Cadastro efetuado com sucesso!';
                        return true;
                    } else {
                        this.message = 'Não foi possível criar a conta!';
                    }
                } else {
                    this.message = 'Conta existente!';
                }
            } else {
                this.message = 'Conta inválida!';
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    getByUsername(user) {
        try {
            if (userSchema.validate(user)) {
                const user = userRepository.read(user);
                if (user) {
                    return user;
                } else {
                    this.message = 'Não foi possível encontrar a conta!';
                }
            } else {
                this.message = 'Conta inválida!';
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    getByEmail(user) {
        try {
            if (userSchema.validate(user)) {
                const user = userRepository.read(user);
                if (user) {
                    return user;
                } else {
                    this.message = 'Não foi possível encontrar a conta!';
                }
            } else {
                this.message = 'Conta inválida!';
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    update(user) {
        try {
            if (userSchema.validate(user)) {
                const userData = this.getByUsername({ username: user.username });
                if (userData) {
                    if (bcrypt.compareSync(user.oldpassword, userData.password))
                    if (userRepository.update(user, { username: user.username, })) {
                        this.message = 'Conta atualizada com sucesso!';
                        return true;
                    } else {
                        this.message = 'Não foi possível atualizar a conta!';
                    }
                } else {
                    this.message = 'Usuário inexistente!';
                }
            } else {
                this.message = 'Conta inválida!';
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    updateByEmail(user) {
        try {
            if (userSchema.validate(user)) {
                if (userRepository.update(user, { email: user.email, })) {
                    this.message = 'Conta(s) atualizada com sucesso!';
                    return true;
                } else { 
                    this.message = 'Não foi possível atualizar a conta(s)!';
                }
            } else {
                this.message = 'Conta inválida!';
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    deleteByEmail(user) {
        try {
            if (userSchema.validate(user)) {
                if (userRepository.deleteByEmail(user)) {
                    this.message = 'Conta(s) deletada(s) com sucesso!';
                    return true;
                } else {
                    this.message = 'Não foi possível deletar a conta(s)!';
                }
            } else {
                this.message = 'Conta inválida!';
            }
            return false;
        } catch (err) {
            return false;
        }
    }
};