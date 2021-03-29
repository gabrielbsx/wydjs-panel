const { updateByUsername } = require('../repositories/user-repository');
const UserService = require('../services/user-service');

exports.create = async (req, res, next) => {
    res.send();
};

exports.read = async (req, res, next) => {
    try {
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            auth: true,
            message: 'Internal error!',
        });
    }
    res.send();
};

exports.update = async (req, res, next) => {
    try {
        const { username, password, oldpassword } = req.body;
        const userService = new UserService();
        userService.setUsername(username);
        userService.setPassword(password);
        userService.setOldPassword(oldpassword);
        userService.updateByUsername(username);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            auth: true,
            message: 'Internal error!',
        });
    }
};

exports.delete = async (req, res, next) => {
    res.send();
};