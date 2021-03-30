module.exports = async (req, res, next) => {
    try {
        if (req.body.access === 3) {
            return next();
        }
        return res.status(403).json({
            status: 'error',
            auth: true,
            isAdmin: false,
            message: 'Usuário não é administrador!',
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            isAdmin: false,
            message: err.toString(),
        });
    }
};