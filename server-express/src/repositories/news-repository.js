const newsModel = require('../models/news-model');

exports.create = async (news) => {
    try {
        return await newsModel.create(news);
    } catch (err) {
        return false;
    }
};

exports.updateById = async (news, where) => {
    try {
        return await newsModel.update(news, {
            where: where,
        });
    } catch (err) {
        return false;
    }
};

exports.deleteById = async (news) => {
    try {
        return await userModel.delete({
            where: news,
        });
    } catch (err) {
        return false;
    }
};

