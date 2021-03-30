const { updateByUsername } = require('../repositories/news-repository');
const NewsService = require('../services/news-service');

exports.create = async (req, res, next) => {
    try {
        const { title, slug, category, content, name } = req.body;
        const newsService = NewsService();

        newsService.setTitle(title);
        newsService.setSlug(slug);
        newsService.category(category);
        newsService.content(content);
        newsService.name(name);

        const create = newsService.create();

        return res.send();

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: err.toString(),
        })
    }
};

exports.read = async (req, res, next) => {
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