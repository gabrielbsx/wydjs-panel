const userModel = require('../models/users-model');

exports.create = async (user) => {
    try {
        return await userModel.create(user);
    } catch (err) {
        return false;
    }
};

exports.exists = async (user) => {
    try {
        return await userModel.findOne({
            where: user,
        });
    } catch (err) {
        return false;
    }
};

exports.updateByEmail = async (user) => {
    try {
        return await userModel.update(user, {
            where: {
                email: user.email,
            },
        });
    } catch (err) {
        return false;
    }
};

exports.updateByUsername = async (user) => {
    try {
        return await userModel.update(user, {
            where: {
                username: user.username,
            },
        })
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