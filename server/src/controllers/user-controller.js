const { updateByUsername } = require('../repositories/user-repository');
const UserService = require('../services/user-service');

exports.create = async (req, res, next) => {
    try {
        return res.send();
    } catch (err) {
        return res.status(500).json({

        });
    }
};

exports.read = async (req, res, next) => {
    try {
        return res.send();
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: 'Internal error!',
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        const { username, password, oldpassword } = req.body;
        const userService = new UserService();
        userService.setUsername(username);
        userService.setPassword(password);
        userService.setOldPassword(oldpassword);
        userService.updateByUsername(username);
        return res.send();
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: 'Internal error!',
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        return res.send();
    } catch (err) {
        return res.status(500).json({

        });
    }
};