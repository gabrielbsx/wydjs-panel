const { updateByUsername } = require('../repositories/user-repository');
const UserService = require('../services/user-service');

exports.create = async (req, res, next) => {
    try {

        const { name, username, password, email, confirm_password } = req.body;

        const userService = new UserService();

        userService.setName(name);
        userService.setUsername(username);
        userService.setPassword(password);
        userSerivce.setConfirmPassword(confirm_password);
        userService.setEmail(email);
        userService.setStatus(0);
        userService.setAccess(0);

        return res.status(200).json({
            status: 'success',
            message: userService.getMessage(),
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.toString(),
        });
    }
};

exports.read = async (req, res, next) => {
    try {
        return res.status(200).json({
            status: 'success',
            auth: true,
            message: '',
        });
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
        const { username, password, oldpassword } = req.body;

        const userService = new UserService();
        
        userService.setUsername(username);
        userService.setPassword(password);
        userService.setOldPassword(oldpassword);
        userService.updateByUsername();

        return res.status(200).json({
            status: 'error',
            auth: true,
            message: userService.message,
        });
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
        return res.status(200).json({
            status: 'success',
            auth: true,
            message: 'Usuário deletado com sucesso!',
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: err.toString(),
        });
    }
};