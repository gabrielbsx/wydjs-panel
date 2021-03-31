const { updateByUsername } = require('../repositories/user-repository');
const UserService = require('../services/user-service');

exports.create = async (req, res, next) => {
    try {

        const { name, username, password, email, confirm_password, status, access } = req.body;

        const userService = new UserService();

        var result = userService.create({
            name: name,
            username: username,
            password: password,
            confirm_password: confirm_password,
            email: email,
            status: status,
            access: access,
        });

        if (result) {
            return res.status(200).json({
                status: 'success',
                message: userService.message,
            });
        }

        return res.status(400).json({
            status: 'error',
            message: userService.message,
        });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Não foi possível efetuar aa operação',
        });
    }
};

exports.getByUsername = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const userService = new UserService();

        var result = userService.getByUsername({
            username: username,
            password: password,
        });

        if (result) {
            return res.status(200).json({
                status: 'success',
                auth: true,
                message: result,
            });
        }
        return res.status(400).json({
            status: 'error',
            auth: true,
            message: 'Não há conta com este email',
        });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: 'Não foi possível efetuar a operação!',
        });
    }
};

exports.getByEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const userService = new UserService();

        var result = userService.getByEmail({
            email: email,
        });

        if (result) {
            return res.status(200).json({
                status: 'success',
                auth: true,
                message: result,
            });
        }
        return res.status(400).json({
            status: 'error',
            auth: true,
            message: 'Não há conta com este email',
        });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: 'Não foi possível efetuar a operação!',
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        const { username, password, confirm_password, oldpassword } = req.body;

        const userService = new UserService();

        const user = userService.update({
            username: username,
            password: password,
            confirm_password: confirm_password,
            oldpassword: oldpassword,
        });

        if (user) {
            return res.status(200).json({
                status: 'success',
                auth: true,
                message: userService.message,
            });
        }

        return res.status(400).json({
            status: 'error',
            auth: true,
            message: userService.message,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: 'Não foi possível efetuar a operação!',
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
            message: 'Não foi possível efetuar a operação',
        });
    }
};