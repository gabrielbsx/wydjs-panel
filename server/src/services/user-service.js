const emailRules = require('email-validator');
const userRepository = require('../repositories/user-repository');

module.exports = class userService{
    userRules = /^([A-Za-z0-9]{4,12})$/;
    passRules = /^([A-Za-z0-9]{4,12})$/;

    constructor() {
        this.status = '';
        this.message = '';
    }

    setUsername(username) {
        try {
            if (username.match(this.userRules)) {
                this.username = username;
                return true;
            }
            this.message = 'Usuário deve conter 4 a 12 caracteres alfanuméricos!';
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    setPassword(password) {
        try {
            if (password.match(this.passRules)) {
                this.password = password;
                return true;
            }
            this.message = 'A senha deve conter 4 a 12 caracteres alfanuméricos!';
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }
    
    setEmail(email) {
        try {
            if (emailRules(email) && email.length < 100) {
                this.email = email;
                return true;
            }
            this.message = 'Email inválido!';
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    setName(name) {
        try {
            if (name.length > 4 && name.length < 50) {
                this.name = name;
                return true;
            }
            this.message = 'O nome deve conter entre 4 a 50 caracteres!';
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    setOldPassword(oldpassword) {
        try {
            if (oldpassword.match(this.passRules)) {
                this.oldpassword = oldpassword;
                return true;
            }
            this.message = 'A senha antiga deve conter 4 a 12 caracteres alfanuméricos!';
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    getMessage() {
        return this.message;
    }

    create(username, password, email, name) {
        try {
            if (this.setUsername(username) && this.setPassword(password) && this.setEmail(email) && this.setName(name)) {
                if (!this.userExists()) {
                    if (userRepository.create(this.username, this.password, this.email, this.name)) {
                        this.message = 'Cadastro efetuado com sucesso!';
                        return true;
                    } else this.message = 'Não foi possível efetuar o cadastro!';
                } else this.message = 'Não foi possível efetuar o cadastro!';
            }
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    userExists() {
        try {
            if (userRepository.exists(this.username)) {
                return true;
            }
            this.message = 'Usuário existente!';
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    getByUsername() {
        try {

        } catch (err) {
            return false;
        }
    }

    getByEmail() {
        try {

        } catch (err) {
            return false;
        }
    }

    updateByEmail() {
        try {
            if (emailRules(this.email)) {
                if (this.password.match(this.passRules)) {
                    if (userRepository.updateByEmail(this.email, this.password)) {
    
                    }
                }
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    updateByUsername() {
        try {
            if (this.username.match(this.userRules)) {
                if (this.password.match(this.passRules)) {
                    if (userRepository.updateByUsername(this.username, this.password, this.oldpassword)) {
    
                    }
                }
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    deleteByUsername() {
        try {
            if (this.username.match(this.userRules)) {
    
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