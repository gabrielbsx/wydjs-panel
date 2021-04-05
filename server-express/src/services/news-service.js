const newsRepository = require('../repositories/news-repository');
const userRepository = require('../repositories/user-repository');
const { v4 } = require('uuid');

module.exports = class newsService{
    slugRules = /^([a-zA-Z0-9_-]{10,50})$/;

    constructor() {
        this.message = '';
    }

    async isValidTitle(title) {
        try {
            if (title.length >= 10 && title.length <= 100) {
                return true;
            }
            this.message = 'Título deve conter entre 10 a 100 caracteres!';
            return false;
        } catch (err) {
            return false;
        }
    }

    async isValidSlug(slug) {
        try {
            if (slug.length >= 10 && slug.length <= 50) {
                if (slug.match(/^([a-zA-Z0-9_-])$/i)) {
                    return true;
                }
            }
            this.message = 'Slug deve conter entre 10 a 50 caracteres!';
            return false;
        } catch (err) {
            return false;
        }
    }

    async isValidCategory(category) {
        try {
            if (category > 0 && category < 5) {
                return true;
            }
            this.message = 'Categoria inválida!';
            return false;
        } catch (err) {
            return false;
        }
    }

    async isValidUserId(id) {
        try {
            const user = await userRepository.read({id : id});
            if (user) {
                return user;
            }
            this.message = 'Usuário inválido!';
            return false;
        } catch (err) {
            return false;
        }
    }

    async getMessage() {
        return this.message;
    }

    async create(news) {
        try {
            if (await this.isValidTitle(news.title)) {
                if (await this.isValidCategory(news.category)) {
                    if (await this.isValidUserId(news.id_user)) {
                        if (await this.isValidSlug(news.slug)) {
                            news.id = v4();
                            this.message = 'Notícia criada com sucesso!';
                            return await newsRepository.create(news);
                        }
                    }
                }
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    async updateById(news) {
        try {
            if (await this.isValidTitle(news.title)) {
                if (await this.isValidCategory(news.category)) {
                    if (await this.isValidSlug(news.slug)) {
                        if (await this.isValidUserId(news.userId)) {
                            id = news.id;
                            delete news.id;
                            this.message = 'Notícia atualizada com sucesso!';
                            return await newsRepository.update(news, {id: id});
                        }
                    }
                }
            }
            return false;
        } catch (err) {
            return false;
        }
    }

};