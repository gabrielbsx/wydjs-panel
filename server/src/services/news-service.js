const newsRepository = require('../repositories/news-repository');

module.exports = class newsService{
    slugRules = /^([a-zA-Z0-9_-]{10,50})$/;

    constructor() {
        this.status = '';
        this.message = '';
    }

    setTitle(title) {
        try {
            if (title.length > 10 && title.length < 100) {
                this.title = title;
                return true;
            }
            this.message = 'Título deve conter entre 10 a 100 caracteres!';
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    setSlug(slug) {
        try {
            if (slug.length > 10 && slug.length < 50) {
                this.slug = slug;
                return true;
            }
            this.message = 'Slug deve conter entre 10 a 50 caracteres!';
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    setCategory(category) {
        try {
            if (category > 0 && category < 5) {
                this.category = category;
                return true;
            }
            this.message = 'Categoria inválida!';
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    setContent(content) {
        try {
            return (this.content = content);
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

    setId(id) {
        try {
            if (typeof id === 'number') {
                this.id = id;
                return true;
            }
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    getMessage() {
        return this.message;
    }

    create(title, slug, name, category, content) {
        try {
            if (this.setTitle(title) && this.setSlug(slug) && this.setName(name) && this.setCategory(category) && this.setContent(content)) {
                if (newsRepository.create(this.title, this.slug, this.category, this.content, this.name)) {
                    this.message = 'Notícia criada com sucesso!';
                    return true;
                }
            }
            return false;
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

    updateById(id, title, slug, name, category, content) {
        try {
            if (this.setId(id) && this.setTitle(title) && this.setSlug(slug) && this.setName(name) && this.setCaategory(category) && this.setContent(content)) {
                if (newsRepository.updateById(id, title, slug, category, content, name)) {
                    this.message = 'Notícia atualizada comn sucesso!';
                    return true;
                }
                return false;
            }
        } catch (err) {
            this.message = err.toString();
            return false;
        }
    }

};