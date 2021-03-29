const newsModel = require('../models/news-model');

exports.create = async (title, slug, category, content, name) => {
    try {
        return await newsModel.create({
            title: title,
            slug: slug,
            content: content,
            name: name,
            category: category,
        });
    } catch (err) {
        return false;
    }
};

exports.updateById = async (id, title, slug, category, content, name) => {
    try {
        return await newsModel.update({
            title: title,
            slug: slug,
            content: content,
            name: name,
            category: category,
        }, {
            where: {
                id: id,
            },
        });
    } catch (err) {
        return false;
    }
};

exports.updateByUsername = async (username, password) => {
    try {
        return await userModel.update({
            password: password
        }, {
            where: {
                username: username,
            }
        })
    } catch (err) {
        return false;
    }
};

exports.deleteByUsername = async (username) => {
    try {
        return false;
    } catch (err) {
        return false;
    }
};

