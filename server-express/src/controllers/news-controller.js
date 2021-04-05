const { updateByUsername } = require('../repositories/news-repository');
const NewsService = require('../services/news-service');

exports.create = async (req, res, next) => {
    try {
        const { title, slug, category, content, name, id_user } = req.body;

        const newsService = NewsService();

        const result = await newsService.create({
            title: title,
            slug: slug,
            category: category,
            content: content,
            name: name,
            id_user: id_user,
        });

        if (result) {
            return res.status(200).json({
                status: 'success',
                auth: true,
                message: 'Notícia criada com sucesso!',
            });
        }

        return res.status(404).json({
            status: 'error',
            auth: true,
            message: newsService.message,
        });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: 'Erro interno!',
        })
    }
};

exports.read = async (req, res, next) => {
    try {
        const { slug }
        return res.send();
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: err.toString(),
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        const { title, slug, category, content } = req.body;
        return res.send();
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: err.toString(),
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        return res.send();
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: err.toString(),
        });
    }
};