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
                    const userData = userRepository.create(account);
                    if (userData && Object.keys(userData).length > 0) {
                        this.message = 'Conta criada com sucesso!';
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
                const userData = userRepository.read(user);
                if (userData && Object.keys(userData).length > 0) {
                    this.message = 'Conta encontrada com sucesso!';
                    return true;
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
                const userData = userRepository.read(user);
                if (userData && Object.keys(userData).length > 0) {
                    this.message = 'Conta encontrada com sucesso';
                    return true;
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
                if (userData && Object.keys(userData).length > 0) {
                    if (bcrypt.compareSync(user.oldpassword, userData.password)) {
                        const userUpdate = userRepository.update(user, { username: user.username, });
                        if (userUpdate && Object.keys(userData).length > 0) {
                            this.message = 'Conta atualizada com sucesso!';
                            return true;
                        } else {
                            this.message = 'Não foi possível atualizar a conta!';
                        }
                    } else {
                        this.message = 'Senha antiga inválida!';
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
                const userData = userRepository.update(user, { email: user.email, });
                if (userData && Object.keys(userData).length > 0) {
                    this.message = 'Conta(s) atualizada(s) com sucesso!';
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
                const userData = userRepository.deleteByEmail(user);
                if (userData && Object.keys(userData).length > 0) {
                    this.message = 'Conta(s) deletada(s) com sucesso';
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