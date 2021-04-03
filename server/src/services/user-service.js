const userRepository = require('../repositories/user-repository');
const userSchema = require('../schemas/users-schema');
const bcrypt = require('bcryptjs');

module.exports = class userService{    
    constructor() {
        this.message = '';
    }

    async getMessage() {
        return this.message;
    }

    async create(user) {
        try {
            if (userSchema.validate(user)) {
                if (!(await this.getByUsername({ username: user.username }))) {
                    delete user.confirm_password;
                    const userData = await userRepository.create(user);
                    if (userData) {
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
            this.message = 'Não foi possível efetuar aa operação!';
            return false;
        }
    }

    async getByUsername(user) {
        try {
            if (userSchema.validate(user)) {
                const userData = await userRepository.read(user);
                if (userData) {
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

    async getByEmail(user) {
        try {
            if (userSchema.validate(user)) {
                const userData = await userRepository.read(user);
                if (userData) {
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

    async update(user) {
        try {
            if (userSchema.validate(user)) {
                const userData = await this.getByUsername({ username: user.username });
                if (userData) {
                    if (bcrypt.compareSync(user.oldpassword, userData.password)) {
                        const userUpdate = await userRepository.update(user, { username: user.username, });
                        if (userUpdate) {
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

    async updateByEmail(user) {
        try {
            if (userSchema.validate(user)) {
                const userData = await userRepository.update(user, { email: user.email, });
                if (userData) {
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

    async deleteByEmail(user) {
        try {
            if (userSchema.validate(user)) {
                const userData = await userRepository.deleteByEmail(user);
                if (userData) {
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