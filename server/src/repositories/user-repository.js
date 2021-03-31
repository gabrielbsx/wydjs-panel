const userModel = require('../models/users-model');

exports.create = async (user) => {
    try {
        return await userModel.create(user);
    } catch (err) {
        return false;
    }
};

exports.read = async (user) => {
    try {
        return await userModel.findOne({
            where: user,
        })
    } catch (err) {
        return false;
    }
};

exports.update = async (user, whereParam) => {
    try {
        return await userModel.update(user, {
            where: whereParam,
        });
    } catch (err) {
        return false;
    }
};

exports.delete = async (user) => {
    try {
        return await userModel.delete({
            where: user,
        });
    } catch (err) {
        return false;
    }
};