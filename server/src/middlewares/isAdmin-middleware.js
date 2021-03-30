module.exports = async (req, res, next) => {
    try {

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            isAdmin: false,
            message: err.toString(),
        });
    }
};