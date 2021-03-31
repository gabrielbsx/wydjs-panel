const newsModel = require('../models/news-model');

exports.create = async (news) => {
    try {
        return await newsModel.create(news);
    } catch (err) {
        return false;
    }
};

exports.updateById = async (news) => {
    try {
        return await newsModel.update(news, {
            where: {
                id: news.id,
            },
        });
    } catch (err) {
        return false;
    }
};

exports.deleteById = async (news) => {
    try {
        return await userModel.delete({
            where: {
                id: news.id,
            },
        });
    } catch (err) {
        return false;
    }
};

