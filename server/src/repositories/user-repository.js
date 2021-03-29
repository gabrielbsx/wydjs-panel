const userModel = require('../models/users-model');

exports.create = async (username, password, email, name) => {
    try {
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

exports.exists = async (username) => {
    try {
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

exports.updateByEmail = async (email) => {
    try {
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

exports.updateByUsername = async (username, password) => {
    try {
        return await userModel.update({
            password: password
        }, {
            where: {
                username: username
            }
        })
    } catch (err) {
        console.log(err);
        return false;
    }
};

exports.deleteByUsername = async (username) => {
    try {
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

