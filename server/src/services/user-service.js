const userRepository = require('../repositories/user-repository');
const userSchema = require('../schemas/users-schema');

module.exports = class userService{
    constructor() {
        this.message = '';
    }

    create(account) {
        try {
            if (userSchema.validate(account)) {
                if (!this.userExists()) {
                    if (userRepository.create(this.username, this.password, this.email, this.name, this.access, this.status)) {
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

    userExists() {
        try {
            if (userRepository.exists(this.username)) {
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    getByUsername() {
        try {
            const user = userRepository.getByUsername(this.username);
            if (user) {
                return user;
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    getByEmail() {
        try {
            const user = userRepository.getByEmail(this.email);
            if (user) {
                return user;
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    updateByEmail(user) {
        try {
            if (userSchema.validate(user)) {
                if (userRepository.updateByEmail(user)) {
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

    updateByUsername(user) {
        try {
            if (userSchema.validate(user)) {
                if (userRepository.updateByUsername(this.username, this.password, this.oldpassword)) {
                    this.message = '';
                    return true;
                } else {
                    this.message = 'Não foi possível atualizar a conta!';
                }
            } else {
                this.message = 'Conta inválida!';
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    deleteByUsername(user) {
        try {
            if (userSchema.validate(user)) {
                if
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    deleteByEmail() {
        try {
            if (emailRules(this.email)) {
    
            }
            return false;
        } catch (err) {
            return false;
        }
    }
};